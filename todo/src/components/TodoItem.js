import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faCircle,
  faEdit,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";

const TodoItem = ({
  todo,
  editTodo,
  setEditTodo,
  toggleTodoCompletion,
  onUpdateTodo,
  onCancelEdit,
  onDeleteTodo,
}) => {
  return (
    <li className="todo-item">
      <div onClick={() => toggleTodoCompletion(todo.id)}>
        <FontAwesomeIcon
          icon={todo.isCompleted ? faCheckCircle : faCircle}
          className="todo-icon"
        />
      </div>
      {editTodo?.id === todo.id ? (
        <>
          <input
            type="text"
            className="todo-input"
            value={editTodo.title}
            onChange={(e) =>
              setEditTodo((prev) => ({ ...prev, title: e.target.value }))
            }
          />
          <input
            type="text"
            className="todo-input"
            value={editTodo.description}
            onChange={(e) =>
              setEditTodo((prev) => ({
                ...prev,
                description: e.target.value,
              }))
            }
          />
          <input
            type="date"
            className="todo-input"
            value={editTodo.dueDate}
            onChange={(e) =>
              setEditTodo((prev) => ({
                ...prev,
                dueDate: e.target.value,
              }))
            }
          />
          <div className="button-group">
            <button
              onClick={() => onUpdateTodo(editTodo)}
              className="save-button"
            >
              Save
            </button>
            <button onClick={onCancelEdit} className="cancel-button">
              Cancel
            </button>
          </div>
        </>
      ) : (
        <>
          <span className="todo-text">
            <strong>{todo.title}</strong> -{" "}
            {todo.dueDate && (
              <small>
                <em>Finish: {todo.dueDate}</em>
              </small>
            )}
            <br />
            {todo.description && <em>{todo.description}</em>}
            <br />
            {todo.isCompleted ? (
              <small>Completed</small>
            ) : (
              <small>Not completed</small>
            )}
          </span>
          <div className="button-group">
            <button onClick={() => setEditTodo(todo)} className="edit-button">
              <FontAwesomeIcon icon={faEdit} />
            </button>
            <button
              onClick={() => onDeleteTodo(todo.id)}
              className="delete-button"
            >
              <FontAwesomeIcon icon={faTrashAlt} />
            </button>
          </div>
        </>
      )}
    </li>
  );
};

export default TodoItem;
