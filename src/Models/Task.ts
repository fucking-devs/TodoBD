import { Schema, model } from 'mongoose'

export interface Task {
  title: string
  completeness: boolean
}

const taskSchema = new Schema<Task>(
  {
    title: { type: String, required: true },
    completeness: { type: Boolean, default: false }
  },
  {
    timestamps: true
  }
)

export default model('task', taskSchema) 