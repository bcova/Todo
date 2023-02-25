import TodoList from "./components/TodoList.js";
import React, { useState, useRef, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import "./app.css";



const LOCAL_STORAGE_KEY = "todoApp.todos";

function App() {
  const [todos, setTodos] = useState([]);
  const todoNameRef = useRef();
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (storedTodos) setTodos((prevTodos) => [...prevTodos, ...storedTodos]);
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);


  function toggleTodo(id) {
    const newTodos = [...todos];
    const todo = newTodos.find((todo) => todo.id === id);
    todo.complete = !todo.complete;
    setTodos(newTodos);
  }

  function handleAddTodo(e) {
    
    const name = todoNameRef.current.value;
    if (name === '') {setIsActive(true); console.log(isActive);}else{setIsActive(false); console.log(isActive)
    setTodos((prevTodos) => {
      return [...prevTodos, { id: uuidv4(), name: name, complete: false}];
    });
    todoNameRef.current.value = null}

  }

  function handleClearTodos() {
    const newTodos = todos.filter((todo) => !todo.complete);
    setTodos(newTodos)
  }

  const handleKeyDown = event => {
    if(event.key === "Enter") {
      handleAddTodo()
    }
  };



  return (
    <div className="app">
      <div className="inputs">
      <div className={isActive ? "invalid-input warn":"invalid-input "}>
  Can not add blank todo!
      </div>
        <input ref={todoNameRef} type="text" className="todo" placeholder="Add todo here..." title="Click here to add a todo!" inputMode="text" enterKeyHint="done" onKeyDown={handleKeyDown} autoFocus required/>
        <button variant="contained" type="button" className="add-btn" onClick={handleAddTodo}>
          Add Todo
        </button>
        <button variant="contained"  type="button" className="clear-btn" onClick={handleClearTodos}>
          Clear Completed Todos
        </button>
      </div>
      <div className="list">
        <div className="count">
          {todos.filter((todo) => !todo.complete).length} left to do
        </div>
        <div>
          <TodoList todos={todos} toggleTodo={toggleTodo} />
        </div>
      </div>
    </div>
  );
}

export default App;
