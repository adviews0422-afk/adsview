import connectDB from '@/lib/db'
import User from '@/lib/model/user.model'
import Transaction from '@/lib/model/transaction.model'
import { NextRequest, NextResponse } from 'next/server'
import { nextauthOptions } from '@/lib/next-auth-option'
import { getServerSession } from 'next-auth'

export async function POST(req: NextRequest) {
  await connectDB()

  const session = await getServerSession(nextauthOptions)
  const user = await User.findById(session?.user?.id)
    .select('-password')
    .select('-role')
    .select('-provider')

  if (!session && user?.role !== 'admin') {
    return NextResponse.json({ error: 'UnAuthorized!' }, { status: 400 })
  }

  const { searchParams } = new URL(req.url)

  const page = parseInt(searchParams.get('page') || '1')
  const limit = parseInt(searchParams.get('limit') || '20')
  const search = searchParams.get('search') || ''

  const skip = (page - 1) * limit

  let userFilter = {}

  if (search) {
    const users = await User.find({
      $or: [
        { email: { $regex: search, $options: 'i' } },
        { name: { $regex: search, $options: 'i' } },
      ],
    }).select('_id')

    const userIds = users.map((u) => u._id)

    userFilter = { userId: { $in: userIds } }
  }

  const [data, total] = await Promise.all([
    Transaction.find(userFilter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('userId', 'name email')
      .lean(),

    Transaction.countDocuments(userFilter),
  ])

  return NextResponse.json({
    data,
    total,
    page,
    pages: Math.ceil(total / limit),
  })
}
