import React from "react";
import "../app.css";

export default function Todo({ todo, toggleTodo, date }) {
  function handleTodoClick() {
    toggleTodo(todo.id);
  }

  return (
    <div className="item">
      <div>
        <input
          className="check"
          type="checkbox"
          checked={todo.complete}
          onChange={handleTodoClick}
        />
        {todo.name}
      </div>
      <div className="date">{date}</div>
    </div>
  );
}
