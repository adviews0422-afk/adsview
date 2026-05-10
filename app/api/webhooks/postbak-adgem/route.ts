import connectDB from '@/lib/db'
import User from '@/lib/model/user.model'
import OfferTransaction from '@/lib/model/offerTransaction.model'
import Transaction from '@/lib/model/transaction.model'
import UserTaskLog from '@/lib/model/userTaskLog.model'
import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  try {
    await connectDB()
    console.log('ADGEM POSTBACK HIT')

    const { searchParams } = new URL(req.url)
    console.log('PARAMS', searchParams)

    const appId = searchParams.get('appid')
    const playerId = searchParams.get('playerid')
    const amount = Number(searchParams.get('amount') || 0)
    const payout = Number(searchParams.get('payout') || 0)

    if (!appId || !playerId) {
      return NextResponse.json({ message: 'Missing params' }, { status: 400 })
    }

    // prevent duplicate transaction (use appId + playerId + amount combo or adjust if AdGem gives transaction id)
    const exists = await OfferTransaction.findOne({
      provider: 'adgem',
      userId: playerId,
      amount,
    })

    if (exists) {
      return NextResponse.json({
        ok: true,
        message: 'duplicate ignored',
      })
    }

    const user = await User.findById(playerId)
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 400 })
    }

    const today = new Date().toISOString().split('T')[0]

    let userTaskLog = await UserTaskLog.findOne({
      userId: playerId,
      date: today,
    })

    if (!userTaskLog) {
      userTaskLog = await UserTaskLog.create({
        userId: playerId,
        isClaimed: false,
        date: today,
        count: 0,
        type: 'task',
      })
    }

    if (userTaskLog.count >= 15) {
      return NextResponse.json({ message: 'Limit reached' }, { status: 400 })
    }

    userTaskLog.count += 1
    await userTaskLog.save()

    await OfferTransaction.create({
      userId: playerId,
      transactionId: `${appId}-${Date.now()}`,
      amount: payout || amount,
      provider: 'adgem',
    })

    await Transaction.create({
      userId: playerId,
      type: 'offer',
      amount: payout || amount,
      sourceId: appId,
      description: 'adgem',
    })

    return NextResponse.json({ success: true, status: 200 }, { status: 200 })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
