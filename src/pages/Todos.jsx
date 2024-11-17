import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addTodo,
  removeTodo,
  toggleComplete,
  editTodo,
  setFilter,
  resetTodos,
} from "../slices/todoSlice";

function Todos() {
  const [input, setInput] = useState("");
  const [editMode, setEditMode] = useState({ id: null, text: "" });

  const inputRef = useRef(null);  // Reference for the input field

  const todos = useSelector((state) => state.todos.todos);
  const filter = useSelector((state) => state.todos.filter);
  const dispatch = useDispatch();

  // Filtered Todos
  const filteredTodos = todos.filter((todo) => {
    if (filter === "completed") return todo.completed;
    if (filter === "pending") return !todo.completed;
    return true;
  });

  // Handle Midnight Reset
  useEffect(() => {
    const now = new Date();
    const millisTillMidnight =
      new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1).getTime() -
      now.getTime();

    const timeout = setTimeout(() => {
      dispatch(resetTodos());
    }, millisTillMidnight);

    return () => clearTimeout(timeout);
  }, [dispatch]);

  // Add or Edit ToDo
  const handleAddEditTodo = () => {
    if (editMode.id) {
      dispatch(editTodo({ id: editMode.id, text: input }));
      setEditMode({ id: null, text: "" });
    } else {
      dispatch(addTodo(input));
    }
    setInput("");  // Reset the input field after adding or editing
  };

  // Focus on the input field when in edit mode
  useEffect(() => {
    if (editMode.id) {
      setInput(editMode.text);  // Pre-fill the input with the todo text
      inputRef.current.focus();
    }
  }, [editMode]);

  return (
    <div className="container mx-auto p-4 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">ToDo App</h1>

      {/* Input Field */}
      <div className="flex gap-2 mb-4">
        <input
          ref={inputRef}  // Assign the ref here
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-grow px-4 py-2 border rounded"
          placeholder="Enter a task..."
        />
        <button
          onClick={handleAddEditTodo}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          {editMode.id ? "Save" : "Add"}
        </button>
      </div>

      {/* Filter Dropdown */}
      <div className="mb-4">
        <select
          value={filter}
          onChange={(e) => dispatch(setFilter(e.target.value))}
          className="px-4 py-2 border rounded"
        >
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="pending">Pending</option>
        </select>
      </div>

      {/* ToDo List */}
      <ul className="space-y-2">
        {filteredTodos.map((todo) => (
          <li
            key={todo.id}
            className="flex justify-between items-center bg-white px-4 py-2 border rounded"
          >
            <div>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => dispatch(toggleComplete(todo.id))}
                className="mr-2"
              />
              <span
                className={`${
                  todo.completed ? "line-through text-gray-500" : ""
                }`}
              >
                {todo.text}
              </span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setEditMode({ id: todo.id, text: todo.text })}
                className="text-blue-500"
              >
                Edit
              </button>
              <button
                onClick={() => dispatch(removeTodo(todo.id))}
                className="text-red-500"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Todos;