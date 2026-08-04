import connectDB from '@/lib/db'
import User from '@/lib/model/user.model'
import Withdrawal from '@/lib/model/withdrawal.model'
import { nextauthOptions } from '@/lib/next-auth-option'

import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    await connectDB()

    const session = await getServerSession(nextauthOptions)

    const user = await User.findById(session?.user?.id).select('-password').select('-provider')

    if (!session || user?.role !== 'admin') {
      return NextResponse.json(
        {
          message: 'Unauthorized!',
          status: 401,
        },
        { status: 401 },
      )
    }

    const { withdrawalId } = await req.json()

    if (!withdrawalId) {
      return NextResponse.json(
        {
          message: 'Withdrawal ID is required',
          status: 400,
        },
        { status: 400 },
      )
    }

    const withdrawal = await Withdrawal.findById(withdrawalId)

    if (!withdrawal) {
      return NextResponse.json(
        {
          message: 'Withdrawal not found',
          status: 404,
        },
        { status: 404 },
      )
    }

    // if (withdrawal.method !== 'manual') {
    //   return NextResponse.json(
    //     {
    //       message: 'Only manual withdrawals can be marked as paid',
    //       status: 400,
    //     },
    //     { status: 400 },
    //   )
    // }

    if (withdrawal.status === 'paid') {
      return NextResponse.json(
        {
          message: 'Withdrawal already paid',
          status: 400,
        },
        { status: 400 },
      )
    }

    withdrawal.status = 'paid'

    await withdrawal.save()

    return NextResponse.json({
      message: 'Withdrawal marked as paid successfully',
      status: 200,
    })
  } catch (error) {
    console.log(error)

    return NextResponse.json(
      {
        message: 'Internal server error',
        status: 500,
      },
      { status: 500 },
    )
  }
}
