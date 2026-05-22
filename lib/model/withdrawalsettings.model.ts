import mongoose, { Document, Model } from 'mongoose'

export interface IWithdrawalSettings extends Document {
  coins: number
  convertion: number
  manual: boolean
}

const withdrawalSettingsSchema = new mongoose.Schema<IWithdrawalSettings>(
  {
    convertion: { type: Number, default: 7 },
    coins: { type: Number, default: 100000 },
    manual: { type: Boolean, default: false },
  },
  { timestamps: true },
)

const WithdrawalSettings: Model<IWithdrawalSettings> =
  mongoose.models.WithdrawalSettings ||
  mongoose.model<IWithdrawalSettings>('WithdrawalSettings', withdrawalSettingsSchema)

export default WithdrawalSettings
