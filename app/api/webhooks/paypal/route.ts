import Withdrawal from '@/lib/model/withdrawal.model'
import User from '@/lib/model/user.model'
import { NextResponse } from 'next/server'
import connectDB from '@/lib/db'

export async function POST(req: Request) {
  try {
    await connectDB()
    const body = await req.json()
    const eventType = body.event_type
    const resource = body.resource

    const withdrawal = await Withdrawal.findOne({
      payoutBatchId: resource?.batch_header?.payout_batch_id,
    })

    if (!withdrawal) {
      return NextResponse.json({ message: 'Not found' }, { status: 404 })
    }

    if (eventType === 'PAYMENT.PAYOUTSBATCH.SUCCESS') {
      withdrawal.status = 'approved'
    }

    if (eventType === 'PAYMENT.PAYOUTSBATCH.FAILED') {
      withdrawal.status = 'rejected'

      const user = await User.findById(withdrawal.userId)
      if (user) {
        user.wallet.balance += withdrawal.coins
        user.wallet.totalWithdrawn -= withdrawal.coins
        await user.save()
      }
    }

    await withdrawal.save()

    return NextResponse.json({ success: true })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
