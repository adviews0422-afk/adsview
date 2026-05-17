// app/api/tasks/complete/route.ts
import connectDB from '@/lib/db'
import Task from '@/lib/model/task.model'
import UserTaskLog from '@/lib/model/userTaskLog.model'
import Transaction from '@/lib/model/transaction.model'
import User from '@/lib/model/user.model'
import { getServerSession } from 'next-auth'
import { nextauthOptions } from '@/lib/next-auth-option'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    await connectDB()
    const session = await getServerSession(nextauthOptions)
    const user = await User.findById(session?.user.id)
    const today = new Date().toDateString()

    if (!user) return NextResponse.json({ message: 'No user found!', status: 400 }, { status: 400 })

    let userTaskLog = await UserTaskLog.findOne({ userId: session?.user.id, date: today })

    if (!userTaskLog) {
      return NextResponse.json({ message: 'No task log found!', status: 400 })
    }

    if (userTaskLog.count > 15) {
      return NextResponse.json({ message: 'Task not yet completed', status: 400 }, { status: 400 })
    }

    if (userTaskLog.isClaimed) {
      return NextResponse.json({ message: 'Task not yet completed', status: 400 }, { status: 400 })
    }

    user.wallet.balance += 1000
    user.wallet.totalEarned += 1000
    //userTaskLog.isClaimed = true
    userTaskLog.count = 0
    await userTaskLog?.save()
    await user.save()

    await Transaction.create({
      userId: user.id,
      type: 'task',
      amount: 1000,
    })

    return NextResponse.json(
      { message: 'Successfully completed task', status: 200 },
      { status: 200 },
    )
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
