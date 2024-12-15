import { Router } from 'express'
import Task from '../Models/Task'

export const taskRouter = Router()

taskRouter.get('/', (req, res) => {
  res.send('API задач')
})

taskRouter.post('/tasks', async (req, res) => {
  const { title } = req.body
  const task = new Task({ title })
  const savedTask = await task.save()
  res.status(201).send(savedTask)
})

taskRouter.get('/tasks', async (req, res) => {
  const tasks = await Task.find()
  res.send(tasks)
})

taskRouter.put('/tasks/:id', async (req, res) => {
  const { id } = req.params
  const { title, completeness } = req.body

  const updatedTask = await Task.findByIdAndUpdate(id, { title, completeness }, { new: true })

  res.send(updatedTask)
})

taskRouter.delete('/tasks/:id', async (req, res) => {
  const { id } = req.params
  await Task.findByIdAndDelete(id)
  res.send({ message: 'Задача удалена' })
})
