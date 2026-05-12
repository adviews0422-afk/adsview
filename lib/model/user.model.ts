import mongoose, { Document, Model } from 'mongoose'

/**
 * =========================
 * USER INTERFACE (TYPESAFE)
 * =========================
 */
export interface IUser extends Document {
  name: string
  email: string
  password?: string
  referralCode?: string
  referredBy?: string
  lastActiveAt: Date
  role: 'user' | 'admin' | 'banned'
  provider: 'credentials' | 'google'

  wallet: {
    balance: number
    totalEarned: number
    totalWithdrawn: number
  }

  socialShares: {
    facebook: boolean
    telegram: boolean
    tiktok: boolean
  }

  createdAt: Date
  updatedAt: Date
}

/**
 * =========================
 * SCHEMA
 * =========================
 */
const userSchema = new mongoose.Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    password: {
      type: String,
      default: null,
    },

    referralCode: {
      type: String,
      index: true,
    },

    referredBy: {
      type: String,
      default: null,
    },

    role: {
      type: String,
      enum: ['user', 'admin', 'banned'],
      default: 'user',
    },

    provider: {
      type: String,
      enum: ['credentials', 'google'],
      default: 'credentials',
    },

    lastActiveAt: {
      type: Date,
      default: Date.now,
      index: true,
    },

    wallet: {
      balance: {
        type: Number,
        default: 0,
      },
      totalEarned: {
        type: Number,
        default: 0,
      },
      totalWithdrawn: {
        type: Number,
        default: 0,
      },
    },

    socialShares: {
      facebook: { type: Boolean, default: false },
      telegram: { type: Boolean, default: false },
      tiktok: { type: Boolean, default: false },
    },
  },
  {
    timestamps: true,
  },
)

/**
 * =========================
 * MODEL (NEXT.JS SAFE)
 * =========================
 */
const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', userSchema)

export default User
