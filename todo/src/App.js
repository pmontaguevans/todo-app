import React, { useEffect, useState } from "react";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import Pagination from "./components/Pagination";
import Search from "./components/Search";
import "./App.css";
import logo from "./checkboxes.png";

function App() {
  const [todos, setTodos] = useState([]);
  const [todoItem, setTodoItem] = useState({
    title: "",
    description: "",
    dueDate: "",
  });
  const [editTodo, setEditTodo] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [todosPerPage] = useState(5);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/todos");
      if (!response.ok) {
        throw new Error("Failed to fetch todos");
      }
      const todos = await response.json();
      setTodos(todos);
    } catch (error) {
      setError(error.message);
      console.error("Error fetching todos", error);
    } finally {
      setLoading(false);
    }
  };

  async function onAddTodo(e) {
    e.preventDefault();
    if (!todoItem.title || !todoItem.description || !todoItem.dueDate) {
      setError("All fields are required.");
      return;
    }
    setError(null);

    try {
      const response = await fetch("/api/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(todoItem),
      });

      if (!response.ok) {
        throw new Error("Failed to add todo");
      }

      const newTodo = await response.json();

      setTodos((prevTodos) => [newTodo, ...prevTodos]);
      setTodoItem({ title: "", description: "", dueDate: "" });
    } catch (error) {
      setError(error.message);
      console.error("Error adding todo:", error);
    }
  }

  async function onUpdateTodo(updatedTodo) {
    try {
      const response = await fetch(`/api/todos/${updatedTodo.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedTodo),
      });

      if (!response.ok) {
        throw new Error(`Failed to update todo with id: ${updatedTodo.id}`);
      }

      const updatedData = await response.json();
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === updatedTodo.id ? updatedData : todo
        )
      );
      setEditTodo(null);
    } catch (error) {
      setError(error.message);
      console.error("Error updating todo", error);
    }
  }

  async function onDeleteTodo(id) {
    const previousTodos = [...todos];
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));

    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`Failed to delete todo: ${response.statusText}`);
      }
    } catch (error) {
      setError(error.message);
      console.error("Error deleting todo", error);

      setTodos(previousTodos);
      fetchTodos();
    }
  }

  function toggleTodoCompletion(id) {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
    );

    setTodos(updatedTodos);
  }

  const filteredTodos = todos.filter((todo) =>
    todo.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredTodos.length / todosPerPage);
  const currentTodos = filteredTodos.slice(
    (currentPage - 1) * todosPerPage,
    currentPage * todosPerPage
  );

  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="app-container">
          <header className="header">
            <h1 className="app-title">Todo List</h1>
            <img className="app-logo" src={logo} alt="logo" />
            <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          </header>
          <TodoForm
            todoItem={todoItem}
            setTodoItem={setTodoItem}
            onAddTodo={onAddTodo}
          />
          {error && <p className="error-message">{error}</p>}{" "}
          <TodoList
            todos={currentTodos}
            editTodo={editTodo}
            setEditTodo={setEditTodo}
            toggleTodoCompletion={toggleTodoCompletion}
            onUpdateTodo={onUpdateTodo}
            onCancelEdit={() => setEditTodo(null)}
            onDeleteTodo={onDeleteTodo}
          />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
          />
        </div>
      )}
    </>
  );
}

export default App;
