import connectDB from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { nextauthOptions } from '@/lib/next-auth-option'
import Transaction from '@/lib/model/transaction.model'

export async function POST(req: NextRequest) {
  try {
    await connectDB()
    const session = await getServerSession(nextauthOptions)
    const transaction = await Transaction.find({ userId: session?.user.id }).populate(
      'userId',
      'name email',
    )

    if (!session && !transaction) {
      return NextResponse.json({ error: 'UnAuthorized!' }, { status: 400 })
    }
    return NextResponse.json({ data: transaction }, { status: 200 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
