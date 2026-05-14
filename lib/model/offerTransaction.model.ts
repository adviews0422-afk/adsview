import mongoose, { Document, Model } from 'mongoose'

export interface IOfferTransaction extends Document {
  userId: mongoose.Types.ObjectId
  provider: 'cpx' | 'adgate' | 'hilltops'
  transactionId: string
  amount: number
  status: 'pending' | 'credited' | 'rejected'
  ip?: string
}

const offerTransactionSchema = new mongoose.Schema<IOfferTransaction>(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    provider: {
      type: String,
      enum: ['gamemonetize', 'adgate', 'hilltops'],
      required: true,
    },
    transactionId: { type: String, unique: true },
    amount: { type: Number, required: true },
    status: {
      type: String,
      enum: ['pending', 'credited', 'rejected'],
      default: 'pending',
    },
    ip: { type: String },
  },
  { timestamps: true },
)

const OfferTransaction: Model<IOfferTransaction> =
  mongoose.models.OfferTransaction ||
  mongoose.model<IOfferTransaction>('OfferTransaction', offerTransactionSchema)

export default OfferTransaction
