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
  const inputRef = useRef(null);
  const todos = useSelector((state) => state.todos.todos);
  const filter = useSelector((state) => state.todos.filter);
  const dispatch = useDispatch();

  const filteredTodos = todos.filter((todo) => {
    if (filter === "completed") return todo.completed;
    if (filter === "pending") return !todo.completed;
    return true;
  });

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

  const handleAddEditTodo = () => {
    if (editMode.id) {
      dispatch(editTodo({ id: editMode.id, text: input }));
      setEditMode({ id: null, text: "" });
    } else {
      dispatch(addTodo(input));
    }
    setInput("");
  };

  useEffect(() => {
    if (editMode.id) {
      setInput(editMode.text);
      inputRef.current.focus();
    }
  }, [editMode]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-teal-100">
      <div className="container mx-auto p-6">
        <div className="bg-white rounded-lg shadow-xl p-6">
          <h1 className="text-3xl font-bold mb-6 text-teal-800">Daily ToDo</h1>
          
          {/* Input Field */}
          <div className="flex gap-3 mb-6">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-grow px-4 py-2 border border-teal-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent shadow-sm"
              placeholder="Enter a task..."
            />
            <button
              onClick={handleAddEditTodo}
              className="px-6 py-2 bg-teal-600 text-white rounded-lg shadow-sm hover:bg-teal-700 transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
            >
              {editMode.id ? "Save" : "Add"}
            </button>
          </div>

          {/* Filter Dropdown */}
          <div className="mb-6">
            <select
              value={filter}
              onChange={(e) => dispatch(setFilter(e.target.value))}
              className="px-4 py-2 border border-teal-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent shadow-sm bg-white"
            >
              <option value="all">All</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
            </select>
          </div>

          {/* ToDo List */}
          <ul className="space-y-3">
            {filteredTodos.map((todo) => (
              <li
                key={todo.id}
                className="group flex justify-between items-center bg-white px-6 py-4 border border-teal-100 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 ease-in-out"
              >
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => dispatch(toggleComplete(todo.id))}
                    className="w-5 h-5 text-teal-600 border-teal-300 rounded focus:ring-teal-500 checked:bg-teal-600"
                  />
                  <span
                    className={`${
                      todo.completed
                        ? "line-through text-gray-400"
                        : "text-gray-700 group-hover:text-teal-600"
                    } transition-colors duration-200 ease-in-out`}
                  >
                    {todo.text}
                  </span>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => setEditMode({ id: todo.id, text: todo.text })}
                    className="text-emerald-600 hover:text-emerald-700 transition-colors duration-200 ease-in-out px-3 py-1 rounded hover:bg-emerald-50"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => dispatch(removeTodo(todo.id))}
                    className="text-red-500 hover:text-red-600 transition-colors duration-200 ease-in-out px-3 py-1 rounded hover:bg-red-50"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Todos;