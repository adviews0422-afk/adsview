import connectDB from '@/lib/db'
import User from '@/lib/model/user.model'
import OfferTransaction from '@/lib/model/offerTransaction.model'
import Transaction from '@/lib/model/transaction.model'
import UserTaskLog from '@/lib/model/userTaskLog.model'
import { NextResponse } from 'next/server'
import { v4 as uuidv4 } from 'uuid'
import { nextauthOptions } from '@/lib/next-auth-option'
import { getServerSession } from 'next-auth'
export async function POST(req: Request) {
  try {
    await connectDB()
    const transId = uuidv4()
    const session = await getServerSession(nextauthOptions)
    if (!session?.user.id || !transId) {
      return NextResponse.json({ message: 'Missing params' }, { status: 400 })
    }

    const exists = await OfferTransaction.findOne({ transactionId: transId })

    if (exists) {
      return NextResponse.json({ ok: true, message: 'duplicate ignored' })
    }

    const user = await User.findById(session.user.id)
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 400 })
    }

    const today = new Date().toISOString().split('T')[0]

    let userTaskLog = await UserTaskLog.findOne({ userId: session.user.id, date: today })
    if (!userTaskLog) {
      userTaskLog = await UserTaskLog.create({
        userId: session.user.id,
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
      userId: session.user.id,
      transactionId: transId,
      amount: 0,
      status: 'credited',
      provider: 'gamemonetize',
    })

    return NextResponse.json({ success: true, status: 200 }, { status: 200 })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
