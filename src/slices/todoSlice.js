import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  todos: [],
  filter: "all", // 'all', 'completed', 'pending'
};

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
    },
    removeTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    toggleComplete: (state, action) => {
      const todo = state.todos.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    editTodo: (state, action) => {
      const { id, text } = action.payload;
      const todo = state.todos.find((todo) => todo.id === id);
      if (todo) {
        todo.text = text;
      }
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    resetTodos: (state) => {
      state.todos = [];
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