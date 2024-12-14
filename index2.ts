import mongoose, { Schema, model, connect, MongooseError } from "mongoose";
import express, { Express, Request, Response } from "express";

interface NewTask {
  title: string;
  completeness: boolean;
  dateCR: Date;
}

const taskschema: Schema = new Schema({
  title: String,
  completeness: Boolean,
  dateCR: Date,
});

const Task = mongoose.model<NewTask>("Task", taskschema);

mongoose
  .connect("mongodb://127.0.0.1:27017/test")
  .then(() => console.log("Подключение к mongoDB"))
  .catch((err) => console.error("Ошибка подключения к MongoDB:", err));

const app: Express = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());

app.post("/tasks", (req, res) => {
  const { title } = req.body;
  const task = new Task({ title });
  task.save();
});

app.get("/tasks", (req, res) => {
  const tasks = Task.find();
  res.send(tasks);
});

app.put("/tasks:id", (req, res) => {
 const {id} = req.params;
 const {completeness} = req.body;
 const task = Task.findByIdAndUpdate
});

app.delete("/tasks:id", (req, res) => {
  const {id} = req.params;
  const task = Task.findByIdAndDelete
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`)
})