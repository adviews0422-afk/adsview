import connectDB from '@/lib/db'
import User from '@/lib/model/user.model'
import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcrypt'
import { getServerSession } from 'next-auth'
import { nextauthOptions } from '@/lib/next-auth-option'

export async function POST(req: NextRequest) {
  try {
    await connectDB()
    const { oldPassword, newPassword } = await req.json()
    const session = await getServerSession(nextauthOptions)
    const user = await User.findById(session?.user?.id)
    if (!session && !user) {
      return NextResponse.json({ error: 'UnAuthorized!' }, { status: 400 })
    }

    if (session?.user?.provider !== 'credentials' || !user?.password) {
      return NextResponse.json(
        {
          error: `Signed in via ${session?.user?.provider}. Changes not allowed with this method.`,
        },
        { status: 200 },
      )
    }

    const passwordIsValid = await bcrypt.compare(oldPassword, user?.password)

    if (!passwordIsValid) {
      return NextResponse.json({ error: 'Incorrect Password!' }, { status: 200 })
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(newPassword, salt)

    await User.findByIdAndUpdate(user._id, {
      password: hashedPassword,
    })

    return NextResponse.json({ message: 'Successfully updated!' }, { status: 200 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
