import { createSlice } from "@reduxjs/toolkit";

// Helper functions for localStorage
const loadFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem("todos");
    return serializedState ? JSON.parse(serializedState) : { todos: [], filter: "all" };
  } catch (e) {
    console.error("Could not load todos from local storage", e);
    return { todos: [], filter: "all" };
  }
};

const saveToLocalStorage = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("todos", serializedState);
  } catch (e) {
    console.error("Could not save todos to local storage", e);
  }
};

// Initial state loaded from localStorage
const initialState = loadFromLocalStorage();

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      const newTodo = {
        id: Date.now(),
        text: action.payload,
        completed: false,
      };
      state.todos.push(newTodo);
      saveToLocalStorage(state); // Save after updating
    },
    removeTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
      saveToLocalStorage(state); // Save after updating
    },
    toggleComplete: (state, action) => {
      const todo = state.todos.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
      saveToLocalStorage(state); // Save after updating
    },
    editTodo: (state, action) => {
      const { id, text } = action.payload;
      const todo = state.todos.find((todo) => todo.id === id);
      if (todo) {
        todo.text = text;
      }
      saveToLocalStorage(state); // Save after updating
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
      saveToLocalStorage(state); // Save after updating
    },
    resetTodos: (state) => {
      state.todos = [];
      saveToLocalStorage(state); // Save after updating
    },
  },
});

export const {
  addTodo,
  removeTodo,
  toggleComplete,
  editTodo,
  setFilter,
  resetTodos,
} = todoSlice.actions;

export default todoSlice.reducer;
