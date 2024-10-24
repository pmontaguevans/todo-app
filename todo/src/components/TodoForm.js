import React, { useState } from "react";

const TodoForm = ({ todoItem, setTodoItem, onAddTodo }) => {
  const [errors, setErrors] = useState({});

  const validateField = (name, value) => {
    const newErrors = { ...errors };

    switch (name) {
      case "title":
        if (!value) {
          newErrors.title = "Title is required";
        } else if (value.length < 3) {
          newErrors.title = "Title must be at least 3 characters long";
        } else {
          delete newErrors.title;
        }
        break;

      case "dueDate":
        if (value) {
          const dueDate = new Date(value);
          const today = new Date();
          if (dueDate < today) {
            newErrors.dueDate = "Due date cannot be in the past";
          } else {
            delete newErrors.dueDate;
          }
        } else {
          delete newErrors.dueDate;
        }
        break;

      default:
        break;
    }

    setErrors(newErrors);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setTodoItem((prev) => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted with:", todoItem);

    if (Object.keys(errors).length === 0 && todoItem.title) {
      onAddTodo(e);
      setErrors({});
    } else {
      console.log("Validation errors:", errors);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <input
        type="text"
        name="title"
        className="todo-input"
        value={todoItem.title}
        onChange={handleChange}
        placeholder="Add new todo"
        required
      />
      {errors.title && <div className="error-message">{errors.title}</div>}{" "}
      <input
        type="text"
        name="description"
        className="todo-input"
        value={todoItem.description}
        onChange={handleChange}
        placeholder="Add description"
      />
      <input
        type="date"
        name="dueDate"
        className="todo-input"
        value={todoItem.dueDate}
        onChange={handleChange}
      />
      {errors.dueDate && <div className="error-message">{errors.dueDate}</div>}{" "}
      <button type="submit" className="add-button">
        Add todo
      </button>
    </form>
  );
};

export default TodoForm;
