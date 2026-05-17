import connectDB from '@/lib/db'
import User from '@/lib/model/user.model'
import Withdrawal from '@/lib/model/withdrawal.model'
import WithdrawalSettings from '@/lib/model/withdrawalsettings.model'
import { nextauthOptions } from '@/lib/next-auth-option'
import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  await connectDB()

  const session = await getServerSession(nextauthOptions)
  const user = await User.findById(session?.user?.id)
    .select('-password')
    .select('-role')
    .select('-provider')

  if (!session && user?.role !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized!' }, { status: 400 })
  }
  let conversionRate = await WithdrawalSettings.findOne({})

  if (!conversionRate) {
    conversionRate = await WithdrawalSettings.create({
      coins: 100000,
      convertion: 7,
    })
  }
  return NextResponse.json(
    {
      data: conversionRate,
      status: 200,
    },
    { status: 200 },
  )
}
