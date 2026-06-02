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
    const { title } = await req.json()
    if (!user) return NextResponse.json({ message: 'No user found!', status: 400 }, { status: 400 })

    let userTaskLog = await Task.create({
      userId: user?.id,
      title: title,
      description: '',
      type: title,
      reward: 3000,
      isClaimed: false,
    })

    if (!userTaskLog) {
      return NextResponse.json({
        message: 'Something went wrong, please try again later!',
        status: 400,
      })
    }
    return NextResponse.json(
      { message: 'Successfully completed task', status: 200 },
      { status: 200 },
    )
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
