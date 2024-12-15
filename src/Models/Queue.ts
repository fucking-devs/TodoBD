import { Schema, model } from 'mongoose'
import { Task } from './Task'

interface Queue {
  title: string
  tasks: Task[]
}

const queueSchema = new Schema<Queue>(
  {
    title: { type: String, required: true },
    tasks: [{
      ref: 'task',
      type: Schema.Types.ObjectId
    }]
  },
  {
    timestamps: true
  }
)

export default model('queue', queueSchema)
