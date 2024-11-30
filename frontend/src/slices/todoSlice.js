import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  todos: [],
  filter: "all",
  status: "idle",
  error: null,
};

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    fetchTodosRequest: (state) => {
      state.status = "loading";
    },
    fetchTodosSuccess: (state, action) => {
      state.status = "succeeded";
      state.todos = action.payload;
    },
    fetchTodosFailure: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
    addTodoSuccess: (state, action) => {
      state.todos.push(action.payload);
    },
    removeTodoSuccess: (state, action) => {
      state.todos = state.todos.filter((todo) => todo._id !== action.payload);
    },
    toggleCompleteSuccess: (state, action) => {
      const todo = state.todos.find((todo) => todo._id === action.payload._id);
      if (todo) {
        todo.completed = action.payload.completed;
      }
    },
    editTodoSuccess: (state, action) => {
      const todo = state.todos.find((todo) => todo._id === action.payload._id);
      if (todo) {
        todo.text = action.payload.text;
      }
    },
  },
});

export const {
  setFilter,
  fetchTodosRequest,
  fetchTodosSuccess,
  fetchTodosFailure,
  addTodoSuccess,
  removeTodoSuccess,
  toggleCompleteSuccess,
  editTodoSuccess,
} = todoSlice.actions;

export default todoSlice.reducer;