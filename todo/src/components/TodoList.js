import React from "react";
import TodoItem from "./TodoItem";

const TodoList = ({
  todos,
  editTodo,
  setEditTodo,
  toggleTodoCompletion,
  onUpdateTodo,
  onCancelEdit,
  onDeleteTodo,
}) => {
  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          editTodo={editTodo}
          setEditTodo={setEditTodo}
          toggleTodoCompletion={toggleTodoCompletion}
          onUpdateTodo={onUpdateTodo}
          onCancelEdit={onCancelEdit}
          onDeleteTodo={onDeleteTodo}
        />
      ))}
    </ul>
  );
};

export default TodoList;
