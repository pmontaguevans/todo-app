import React from "react";

const TodoForm = ({ todoItem, setTodoItem, onAddTodo }) => {
  return (
    <form onSubmit={onAddTodo} className="todo-form">
      <input
        type="text"
        className="todo-input"
        value={todoItem.title}
        onChange={(e) =>
          setTodoItem((prev) => ({ ...prev, title: e.target.value }))
        }
        placeholder="Add new todo"
        required
      />
      <input
        type="text"
        className="todo-input"
        value={todoItem.description}
        onChange={(e) =>
          setTodoItem((prev) => ({ ...prev, description: e.target.value }))
        }
        placeholder="Add description"
      />
      <input
        type="date"
        className="todo-input"
        value={todoItem.dueDate}
        onChange={(e) =>
          setTodoItem((prev) => ({ ...prev, dueDate: e.target.value }))
        }
        placeholder="Due date"
      />
      <button type="submit" className="add-button">
        Add todo
      </button>
    </form>
  );
};

export default TodoForm;
