import mongoose, { Schema, Document } from "mongoose";
import express, { Express, Request, Response } from "express";

interface NewTask extends Document {
  title: string;
  completeness: boolean;
  dateCR: Date;
}

const taskSchema = new Schema<NewTask>({
  title: { type: String, required: true },
  completeness: { type: Boolean, default: false },
  dateCR: { type: Date, default: Date.now },
});

const Task = mongoose.model<NewTask>("Task", taskSchema);

mongoose
  .connect("mongodb://127.0.0.1:27017/test")
  .then(() => console.log("Подключение к MongoDB"))
  .catch((err) => console.error("Ошибка подключения к MongoDB:", err));

const app: Express = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("API задач");
});

app.post("/tasks", (req: Request, res: Response) => {
  const { title } = req.body;
  const task = new Task({ title });
  
  task.save()
    .then(savedTask => res.send(savedTask))
    .catch(err => res.send({ error: 'Ошибка при создании задачи', details: err }));
});

app.get("/tasks", (req: Request, res: Response) => {
  Task.find()
    .then(tasks => res.send(tasks))
    .catch(err => res.send({ error: 'Ошибка при получении задач', details: err }));
});

app.put("/tasks/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const { completeness } = req.body;

  Task.findByIdAndUpdate(id, { completeness }, { new: true })
    .then(task => {
      if (!task) {
        return res.send('Задача не найдена');
      }
      res.send(task);
    })
    .catch(err => res.send({ error: 'Ошибка при обновлении задачи', details: err }));
});

app.delete("/tasks/:id", (req: Request, res: Response) => {
  const { id } = req.params;

  Task.findByIdAndDelete(id)
    .then(task => {
      if (!task) {
        return res.send('Задача не найдена');
      }
      res.send({ message: 'Задача удалена' });
    })
    .catch(err => res.send({ error: 'Ошибка при удалении задачи', details: err }));
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});
