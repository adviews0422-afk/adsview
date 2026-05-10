import connectDB from '@/lib/db'
import User from '@/lib/model/user.model'
import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcrypt'
import { getServerSession } from 'next-auth'
import { nextauthOptions } from '@/lib/next-auth-option'

export async function POST(req: NextRequest) {
  try {
    await connectDB()
    const session = await getServerSession(nextauthOptions)
    const user = await User.findById(session?.user?.id)
      .select('-password')
      .select('-role')
      .select('-provider')

    if (!session && !user) {
      return NextResponse.json({ error: 'UnAuthorized!' }, { status: 400 })
    }

    return NextResponse.json({ data: user }, { status: 200 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
