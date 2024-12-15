import mongoose, { Schema, Document } from 'mongoose'
import express, { Express, Request, Response } from 'express'
import { taskRouter } from './Routers/task'
import { queueRouter } from './Routers/queue'

mongoose
  .connect('mongodb://127.0.0.1:27017/test')
  .then(() => console.log('Подключение к MongoDB'))
  .catch((err) => console.error('Ошибка подключения к MongoDB:', err))

const app: Express = express()
const PORT = process.env.PORT || 3000
app.use(express.json())
app.use(taskRouter)
app.use(queueRouter)

app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`)
})
