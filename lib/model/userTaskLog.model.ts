import mongoose, { Document, Model } from 'mongoose'

export interface IUserTaskLog extends Document {
  userId: mongoose.Types.ObjectId
  type: 'task'
  date: Date
  count: number
  isClaimed: boolean
}

const userTaskLogSchema = new mongoose.Schema<IUserTaskLog>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    type: {
      type: String,
      enum: ['task'],
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    count: {
      type: Number,
      required: true,
      default: 0,
    },
    isClaimed: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true },
)

const UserTaskLog: Model<IUserTaskLog> =
  mongoose.models.UserTaskLog || mongoose.model<IUserTaskLog>('UserTaskLog', userTaskLogSchema)

export default UserTaskLog
