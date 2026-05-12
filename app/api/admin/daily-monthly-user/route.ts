import connectDB from '@/lib/db'
import User from '@/lib/model/user.model'
import Withdrawal from '@/lib/model/withdrawal.model'
import Transaction from '@/lib/model/transaction.model'
import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { nextauthOptions } from '@/lib/next-auth-option'

export async function POST() {
  await connectDB()

  const session = await getServerSession(nextauthOptions)
  const user = await User.findById(session?.user?.id)
    .select('-password')
    .select('-role')
    .select('-provider')

  if (!session && user?.role !== 'admin') {
    return NextResponse.json({ error: 'UnAuthorized!' }, { status: 400 })
  }

  const startOfDay = new Date()
  startOfDay.setHours(0, 0, 0, 0)

  const last30Days = new Date()
  last30Days.setDate(last30Days.getDate() - 30)

  const [dau, mau, totalTransactionAgg, recentWithdrawals, recentTransactions] = await Promise.all([
    User.countDocuments({
      lastActiveAt: { $gte: startOfDay },
    }),

    User.countDocuments({
      lastActiveAt: { $gte: last30Days },
    }),

    Transaction.aggregate([
      {
        $group: {
          _id: null,
          totalAmount: { $sum: '$amount' },
        },
      },
    ]),

    Withdrawal.find({}).sort({ createdAt: -1 }).limit(5).populate('userId', 'name email').lean(),

    Transaction.find({}).sort({ createdAt: -1 }).limit(5).populate('userId', 'name email').lean(),
  ])

  const totalTransactionAmount = totalTransactionAgg?.[0]?.totalAmount || 0

  return NextResponse.json({
    dau,
    mau,
    totalTransactionAmount,
    recentWithdrawals,
    recentTransactions,
  })
}
