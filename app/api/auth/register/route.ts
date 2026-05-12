import connectDB from '@/lib/db'
import User from '@/lib/model/user.model'
import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcrypt'
import Product from '@/lib/model/task.model'
import Transaction from '@/lib/model/transaction.model'

export async function POST(req: NextRequest) {
  try {
    await connectDB()
    const { name, email, password, referral } = await req.json()
    const user = await User.findOne({ email })

    if (user) {
      return NextResponse.json({ error: 'User already exist!' }, { status: 200 })
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      referralCode: Math.random().toString(36).substring(7),
      referredBy: referral || '',
    })

    await newUser.save()

    const referredUser = await User.findOne({ referralCode: referral })
    if (referredUser) {
      referredUser.wallet.balance += 50
      referredUser.wallet.totalEarned += 50
      await referredUser.save()

      await Transaction.create({
        userId: referredUser._id,
        type: 'referral',
        amount: 50,
      })
    }

    return NextResponse.json({ message: 'Successfully registed!' }, { status: 200 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
export async function GET() {
  try {
    connectDB()
    const product = await Product.find({})

    if (!product) {
      return NextResponse.json({ error: 'No product found!' }, { status: 200 })
    }

    return NextResponse.json({ product }, { status: 200 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
