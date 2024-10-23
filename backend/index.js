const express = require("express");
const {
  getCompleted,
  getAll,
  createTodo,
  deleteAll,
  updateTodo,
  deleteTodoById,
} = require("./api");

const PORT = process.env.PORT || 3001;
const app = express();
app.use(express.json());

app.get("/api/todos", getAll);
app.get("/api/completed", getCompleted);
app.post("/api/todos", createTodo);
app.put("/api/todos/:id", updateTodo);
app.delete("/api/todos/:id", deleteTodoById);
app.delete("/api/todos", deleteAll);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
