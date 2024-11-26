import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Plus, Target, Trophy, Coffee } from "lucide-react";
import {
  fetchTodos,
  addTodo,
  removeTodo,
  toggleComplete,
  editTodo,
  setFilter,
} from "../slices/todoSlice";
import ProgressBar from "../components/ProgressBar";
import MotivationalMessage from "../components/MotivationalMessage";
import TodoList from "../components/TodoList";

function Todos() {
  const [input, setInput] = useState("");
  const [editMode, setEditMode] = useState({ id: null, text: "" });
  const inputRef = useRef(null);

  const { todos, filter, status, error } = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const completedTodos = todos.filter((todo) => todo.completed);
  const pendingTodos = todos.filter((todo) => !todo.completed);

  const filteredTodos = todos.filter((todo) => {
    if (filter === "completed") return todo.completed;
    if (filter === "pending") return !todo.completed;
    return true;
  });

  const handleAddEditTodo = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

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
      inputRef.current?.focus();
    }
  }, [editMode]);

  const getMotivationalMessage = () => {
    if (filter === "completed" && completedTodos.length === 0) {
      return {
        icon: <Target className="w-6 h-6 md:w-8 md:h-8 text-teal-600 mb-2 md:mb-3" />,
        title: "Time to Achieve!",
        message: "Set your goals high and don't stop until you reach them. Start by completing your first task!",
      };
    }
    if (filter === "pending" && pendingTodos.length === 0) {
      return {
        icon: <Trophy className="w-6 h-6 md:w-8 md:h-8 text-teal-600 mb-2 md:mb-3" />,
        title: "Outstanding Work! 🌟",
        message: "You've completed all your tasks. Take a moment to celebrate your productivity!",
      };
    }
    if (filter === "all" && todos.length === 0) {
      return {
        icon: <Coffee className="w-6 h-6 md:w-8 md:h-8 text-teal-600 mb-2 md:mb-3" />,
        title: "Fresh Start",
        message: "Ready to plan your day? Add your first task to get started!",
      };
    }
    return null;
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 md:h-12 md:w-12 border-t-2 border-b-2 border-teal-500"></div>
      </div>
    );
  }

  if (status === "failed") {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600 px-4 text-center">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-teal-100 p-2 md:p-4">
      <div className="max-w-3xl mx-auto">
        <div className="backdrop-blur-sm bg-white/90 p-3 md:p-6 rounded-lg shadow-lg">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4 md:mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-teal-800">Daily ToDo</h2>
            <div className="text-sm text-teal-600">
              {completedTodos.length}/{todos.length} completed
            </div>
          </div>

          {/* Input Form */}
          <form onSubmit={handleAddEditTodo} className="flex flex-col sm:flex-row gap-2 md:gap-3 mb-4 md:mb-6">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-grow p-2 border border-teal-200 rounded-md focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none"
              placeholder="Enter a task..."
            />
            <button
              type="submit"
              className="inline-flex items-center justify-center bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-md transition-colors duration-200"
            >
              {editMode.id ? "Update" : "Add Todo"}
            </button>
          </form>

          {/* Filters */}
          <div className="flex flex-wrap gap-2 mb-4 md:mb-6">
            {["all", "completed", "pending"].map((filterType) => (
              <button
                key={filterType}
                onClick={() => dispatch(setFilter(filterType))}
                className={`capitalize px-3 md:px-4 py-1.5 md:py-2 rounded-md transition-colors duration-200 text-sm md:text-base ${
                  filter === filterType
                    ? "bg-teal-600 text-white"
                    : "bg-teal-50 text-teal-600 hover:bg-teal-100"
                }`}
              >
                {filterType}
                {filterType !== "all" && (
                  <span className="ml-1 md:ml-2 text-xs md:text-sm">
                    ({filterType === "completed" ? completedTodos.length : pendingTodos.length})
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Todo List */}
          <TodoList
            todos={filteredTodos}
            onToggleComplete={(id) => dispatch(toggleComplete(id))}
            onEdit={(todo) => setEditMode({ id: todo._id, text: todo.text })}
            onDelete={(id) => dispatch(removeTodo(id))}
          />
          {/* motivational mssg section */}
          {filteredTodos.length === 0 && (
            <MotivationalMessage getMotivationalMessage={getMotivationalMessage} />
          )}

          {/* Progress Footer */}
          {todos.length > 0 && (
            <ProgressBar completed={completedTodos.length} total={todos.length} />
          )}
        </div>
      </div>
    </div>
  );
}

export default Todos;