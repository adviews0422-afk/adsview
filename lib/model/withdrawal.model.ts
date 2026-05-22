import mongoose, { Document, Model } from 'mongoose'

export interface IWithdrawal extends Document {
  userId: mongoose.Types.ObjectId

  amount: number
  coins: number
  method: 'paypal' | 'manual'
  payoutBatchId: string
  paypalEmail: string
  status: 'pending' | 'approved' | 'rejected' | 'paid'

  adminNote?: string
}

const withdrawalSchema = new mongoose.Schema<IWithdrawal>(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    amount: { type: Number, required: true },
    method: { type: String, default: 'paypal' },
    coins: { type: Number, required: true },
    paypalEmail: { type: String, required: true },
    payoutBatchId: { type: String },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected', 'paid'],
      default: 'pending',
    },

    adminNote: { type: String },
  },
  { timestamps: true },
)

const Withdrawal: Model<IWithdrawal> =
  mongoose.models.Withdrawal || mongoose.model<IWithdrawal>('Withdrawal', withdrawalSchema)

export default Withdrawal
