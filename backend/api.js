const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "todos.json");

const loadTodos = () => {
  try {
    const dataBuffer = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(dataBuffer);
  } catch (error) {
    console.error("Error loading todos:", error);
    return [];
  }
};

const saveTodos = (todos) => {
  try {
    fs.writeFileSync(filePath, JSON.stringify(todos, null, 2));
  } catch (error) {
    console.error("Error saving todos:", error);
  }
};

let todos = loadTodos();

const getAll = (req, res) => {
  return res.status(200).json(todos);
};

const getCompleted = (req, res) => {
  const completedTodos = todos.filter((todo) => todo.isCompleted === true);
  return res.status(200).json(completedTodos);
};

const createTodo = (req, res) => {
  const { title, description, dueDate } = req.body;

  if (!title) {
    return res.status(400).json({ message: "Title is required" });
  }

  const newTodo = {
    id: Date.now(),
    title,
    description: description || "",
    dueDate: dueDate || "",
    isCompleted: false,
  };

  todos.unshift(newTodo);
  saveTodos(todos);

  return res.status(201).json(newTodo);
};

const updateTodo = (req, res) => {
  const { id } = req.params;
  const { title, description, dueDate, isCompleted } = req.body;

  const todoIndex = todos.findIndex((todo) => todo.id === parseInt(id));
  if (todoIndex === -1) {
    return res
      .status(404)
      .json({ message: `Todo with id ${id} does not exist` });
  }

  if (title !== undefined) todos[todoIndex].title = title;
  if (description !== undefined) todos[todoIndex].description = description;
  if (dueDate !== undefined) todos[todoIndex].dueDate = dueDate;
  if (isCompleted !== undefined) todos[todoIndex].isCompleted = isCompleted;

  saveTodos(todos);
  return res.status(200).json(todos[todoIndex]);
};

const deleteTodoById = (req, res) => {
  const { id } = req.params;
  const initialLength = todos.length;

  todos = todos.filter((todo) => todo.id !== parseInt(id));
  saveTodos(todos);

  if (todos.length < initialLength) {
    return res
      .status(200)
      .json({ message: `Todo with id ${id} deleted`, todos });
  } else {
    return res.status(404).json({ message: `Todo with id ${id} not found` });
  }
};

const deleteAll = (req, res) => {
  todos = [];
  saveTodos(todos);
  return res.status(200).json({ message: "All todos deleted!", todos });
};

module.exports = {
  getCompleted,
  getAll,
  createTodo,
  deleteAll,
  updateTodo,
  deleteTodoById,
};
