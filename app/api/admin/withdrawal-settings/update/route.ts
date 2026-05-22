import connectDB from '@/lib/db'
import User from '@/lib/model/user.model'
import Withdrawal from '@/lib/model/withdrawal.model'
import WithdrawalSettings from '@/lib/model/withdrawalsettings.model'
import { nextauthOptions } from '@/lib/next-auth-option'
import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  await connectDB()

  const { coins, convertion, manual } = await req.json()

  if (!coins || !convertion) {
    return NextResponse.json({ message: 'Invalid params!' }, { status: 400 })
  }

  const session = await getServerSession(nextauthOptions)
  const user = await User.findById(session?.user?.id)
    .select('-password')
    .select('-role')
    .select('-provider')

  if (!session && user?.role !== 'admin') {
    return NextResponse.json({ error: 'UnAuthorized!' }, { status: 400 })
  }
  let conversionRate = await WithdrawalSettings.findOne({})
  if (conversionRate) {
    conversionRate.convertion = Number(convertion)
    conversionRate.coins = Number(coins)
    conversionRate.manual = manual
    await conversionRate.save()
    return NextResponse.json(
      {
        message: 'Successfully updated!',
        status: 200,
      },
      { status: 200 },
    )
  } else {
    return NextResponse.json(
      {
        message: 'Something went wrong, please try again!',
        status: 400,
      },
      { status: 400 },
    )
  }
}
