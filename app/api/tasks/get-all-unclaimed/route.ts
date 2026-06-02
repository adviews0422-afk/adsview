// app/api/tasks/complete/route.ts
import connectDB from '@/lib/db'
import Task from '@/lib/model/task.model'
import User from '@/lib/model/user.model'
import { getServerSession } from 'next-auth'
import { nextauthOptions } from '@/lib/next-auth-option'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    await connectDB()
    const session = await getServerSession(nextauthOptions)
    const user = await User.findById(session?.user.id)
    if (!user) return NextResponse.json({ message: 'No user found!', status: 400 }, { status: 400 })

    const userTaskLog = await Task.find({
      userId: user?.id,
      isClaimed: false,
    })

    return NextResponse.json({ data: userTaskLog, status: 200 }, { status: 200 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
