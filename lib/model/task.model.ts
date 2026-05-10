import mongoose, { Document, Model } from 'mongoose'

export interface ITask extends Document {
  title: string
  description?: string
  type: 'ad' | 'share' | 'daily' | 'referral'
  reward: number
  limitPerDay: number
  cooldownSeconds?: number
  isActive: boolean
}

const taskSchema = new mongoose.Schema<ITask>(
  {
    title: { type: String, required: true },
    description: { type: String },
    type: {
      type: String,
      enum: ['ad', 'share', 'daily', 'referral'],
      required: true,
    },
    reward: { type: Number, default: 10 },
    limitPerDay: { type: Number, default: 15 },
    cooldownSeconds: { type: Number, default: 30 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
)

const Task: Model<ITask> = mongoose.models.Task || mongoose.model<ITask>('Task', taskSchema)

export default Task
