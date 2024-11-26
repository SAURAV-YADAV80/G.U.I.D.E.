import React from "react";
import { Edit2, Trash2 } from "lucide-react";

const TodoList = ({ todos, onToggleComplete, onEdit, onDelete }) => {
  return (
    <div className="space-y-2 md:space-y-3">
      {todos.map((todo) => (
        <div
          key={todo._id}
          className="flex items-center gap-2 md:gap-4 p-3 md:p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
        >
          <div className="flex items-center gap-2 md:gap-3 flex-grow min-w-0">
            <label className="flex items-center flex-shrink-0">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => onToggleComplete(todo._id)}
                className="w-4 h-4 md:w-5 md:h-5 border-2 border-teal-500 rounded text-teal-600 focus:ring-teal-500"
              />
            </label>
            <span
              className={`text-base md:text-lg break-all ${
                todo.completed ? "line-through text-teal-600 opacity-60" : ""
              }`}
            >
              {todo.text}
            </span>
          </div>
          <div className="flex gap-1 md:gap-2 flex-shrink-0">
            <button
              onClick={() => onEdit(todo)}
              className="p-1.5 md:p-2 text-blue-600 hover:bg-blue-50 rounded-md transition-colors duration-200"
              aria-label="Edit todo"
            >
              <Edit2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => onDelete(todo._id)}
              className="p-1.5 md:p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors duration-200"
              aria-label="Delete todo"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TodoList;