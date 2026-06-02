import mongoose, { Document, Model } from 'mongoose'

export interface ITask extends Document {
  userId: mongoose.Types.ObjectId
  title: string
  description?: string
  type: 'ad' | 'share' | 'daily' | 'referral'
  reward: number
  isClaimed: boolean
}

const taskSchema = new mongoose.Schema<ITask>(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    title: { type: String, required: true },
    description: { type: String },
    type: {
      type: String,
      required: true,
    },
    reward: { type: Number, default: 3000 },
    isClaimed: { type: Boolean, default: true },
  },
  { timestamps: true },
)

const Task: Model<ITask> = mongoose.models.Task || mongoose.model<ITask>('Task', taskSchema)

export default Task
