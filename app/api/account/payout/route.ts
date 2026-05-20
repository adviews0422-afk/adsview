import paypal from '@paypal/payouts-sdk'
import User from '@/lib/model/user.model'
import Withdrawal from '@/lib/model/withdrawal.model'
import { client } from '@/lib/paypal'
import { nextauthOptions } from '@/lib/next-auth-option'
import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'
import Transaction from '@/lib/model/transaction.model'
import WithdrawalSettings from '@/lib/model/withdrawalsettings.model'
export async function POST(req: NextRequest) {
  const { email } = await req.json()
  const session = await getServerSession(nextauthOptions)
  if (!session?.user?.id) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }
  if (!email) {
    return NextResponse.json({ message: 'Invalid params!' }, { status: 404 })
  }
  const user = await User.findById(session.user.id)
  if (!user) {
    return NextResponse.json({ message: 'No user found' }, { status: 404 })
  }

  let convertionRate = await WithdrawalSettings.findOne({})

  if (!convertionRate) {
    convertionRate = await WithdrawalSettings.create({
      coins: 100000,
      convertion: 7,
    })
  }

  const fullUnits = Math.floor(user.wallet.balance / convertionRate.coins)

  if (fullUnits <= 0) {
    return NextResponse.json({ message: 'Insufficient balance' }, { status: 400 })
  }

  const amount = fullUnits * convertionRate.coins
  const totalToWithdraw = fullUnits * convertionRate.convertion
  try {
    const request = new paypal.payouts.PayoutsPostRequest()
    request.requestBody({
      sender_batch_header: {
        sender_batch_id: `batch_${Date.now()}`,
        email_subject: 'You got paid!',
      },
      items: [
        {
          recipient_type: 'EMAIL',
          receiver: email,
          amount: {
            value: totalToWithdraw.toFixed(2),
            currency: 'PHP',
          },
          note: 'Thanks for using our platform!',
        },
      ],
    })

    const response = await client().execute(request)

    const payoutId = response.result?.batch_header?.payout_batch_id

    if (!payoutId) {
      return NextResponse.json({ message: 'Invalid PayPal response' }, { status: 500 })
    }

    user.wallet.balance -= amount
    user.wallet.totalEarned += amount
    user.wallet.totalWithdrawn += amount
    await user.save()

    const withdrawal = await Withdrawal.create({
      userId: user._id,
      amount: totalToWithdraw,
      method: 'paypal',
      paypalEmail: email,
      status: 'pending',
      payoutBatchId: payoutId,
    })

    await Transaction.create({
      userId: user._id,
      type: 'withdrawal',
      amount,
    })

    return NextResponse.json(
      {
        message: 'Payout successful',
        payoutId,
        withdrawalId: withdrawal._id,
        status: 200,
      },
      { status: 200 },
    )
  } catch (err: any) {
    return NextResponse.json(
      {
        message: 'Payout failed',
        error: err.message,
      },
      { status: 500 },
    )
  }
}
