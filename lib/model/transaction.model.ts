import mongoose, { Document, Model } from 'mongoose'

export interface ITransaction extends Document {
  userId: mongoose.Types.ObjectId
  type: 'task' | 'offer' | 'referral' | 'withdrawal'
  amount: number
  sourceId?: string
  description?: string
}

const transactionSchema = new mongoose.Schema<ITransaction>(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    type: {
      type: String,
      required: true,
    },
    amount: { type: Number, required: true },
    sourceId: { type: String },
    description: { type: String },
  },
  { timestamps: true },
)

const Transaction: Model<ITransaction> =
  mongoose.models.Transaction || mongoose.model<ITransaction>('Transaction', transactionSchema)

export default Transaction
