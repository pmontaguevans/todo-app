const express = require("express");
const path = require("path");
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

// API routes
app.get("/api/todos", getAll);
app.get("/api/completed", getCompleted);
app.post("/api/todos", createTodo);
app.put("/api/todos/:id", updateTodo);
app.delete("/api/todos/:id", deleteTodoById);
app.delete("/api/todos", deleteAll);

app.use(express.static(path.join(__dirname, "todo/build")));

// The catchall handler: for any request that doesn't match one above,
// send back the React app.
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "todo/build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
