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

app.post("/tasks", async (req: Request, res: Response) => {
  const { title } = req.body;
  const task = new Task({ title });
  const savedTask = await task.save();
  res.status(201).send(savedTask);
});

app.get("/tasks", async (req: Request, res: Response) => {
  const tasks = await Task.find();
  res.send(tasks);
});

app.put("/tasks/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, completeness } = req.body;

  const updatedTask = await Task.findByIdAndUpdate(
    id,
    { title, completeness },
    { new: true }
  );

  res.send(updatedTask);
});

app.delete("/tasks/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  await Task.findByIdAndDelete(id);
  res.send({ message: "Задача удалена" });
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});
