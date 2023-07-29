import React, { useState } from 'react';
import './TodoList.css';

export default function TodoApp() {
  const [todos, setTodos] = useState([]);

  const handleAddTodo = (todo) => {
    setTodos((prevTodos) => [
      ...prevTodos,
      todo
    ]);
  };

  const handleUpdateTodo = (index, updatedTodo) => {
    setTodos((prevTodos) => {
      const updatedTodos = [...prevTodos];
      updatedTodos[index].title = updatedTodo;
      return updatedTodos;
    });
  };

  const handleDeleteTodo = (todo) => {
    setTodos((prevTodos) =>
      prevTodos.filter((prevTodo) => prevTodo.id !== todo.id)
    );
  };

  return (
    <div className="container">
      <h4 className="mb-3">My Todo</h4>
      <AddTodo handleAddTodo={handleAddTodo} />
      <TodoList
        todos={todos}
        handleUpdateTodo={handleUpdateTodo}
        handleDeleteTodo={handleDeleteTodo}
      />
    </div>
  );
}

const AddTodo = ({ handleAddTodo }) => {
  const [todo, setTodo] = useState('');

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleClick = () => {
    const text = todo.trim();

    if (!text) {
      return;
    }

    setTodo('');

    handleAddTodo({ id: Date.now(), title: text });
  };

  return (
    <div className="row mb-3">
      <div className="col mb-3">
        <div className="d-flex">
          <input
            onChange={handleChange}
            type="text"
            placeholder="add item"
            id="new-todo"
            className="form-control mr-2"
            value={todo}
          />
          <button id="add-btn" className="btn btn-add" onClick={handleClick}>
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

const TodoList = ({ todos, handleUpdateTodo, handleDeleteTodo }) => {
  const handleChange = (index, updatedTodo) => {
    handleUpdateTodo(index, updatedTodo);
  };

  const handleClick = (todo) => () => {
    handleDeleteTodo(todo);
  };

  return (
    <div className="row">
      <div className="col">
        <h5>Todos</h5>
        <ul id="todos" className="list-group">
          {todos.map((todo, index) => (
            <li
              className="list-group-item d-flex justify-content-between align-items-center"
              key={todo.id}
            >
              <input
                type="text"
                value={todo.title}
                onChange={(e) => handleChange(index, e.target.value)}
              />
              <button
                className="btn btn-danger"
                onClick={handleClick(todo)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
