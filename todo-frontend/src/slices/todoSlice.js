import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:5000/api/todos";

export const fetchTodos = createAsyncThunk("todos/fetchTodos", async () => {
  const response = await axios.get(API_URL);
  return response.data;
});

export const addTodo = createAsyncThunk("todos/addTodo", async (text) => {
  const response = await axios.post(API_URL, { text, completed: false });
  return response.data;
});

export const removeTodo = createAsyncThunk("todos/removeTodo", async (id) => {
  await axios.delete(`${API_URL}/${id}`);
  return id;
});

export const toggleComplete = createAsyncThunk("todos/toggleComplete", async (id, { getState }) => {
  const todo = getState().todos.todos.find(t => t._id === id);
  const response = await axios.patch(`${API_URL}/${id}`, { 
    completed: !todo.completed 
  });
  return response.data;
});

export const editTodo = createAsyncThunk("todos/editTodo", async ({ id, text }) => {
  const response = await axios.patch(`${API_URL}/${id}`, { text });
  return response.data;
});

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
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.todos = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        state.todos.push(action.payload);
      })
      .addCase(removeTodo.fulfilled, (state, action) => {
        state.todos = state.todos.filter((todo) => todo._id !== action.payload);
      })
      .addCase(toggleComplete.fulfilled, (state, action) => {
        const todo = state.todos.find((todo) => todo._id === action.payload._id);
        if (todo) {
          todo.completed = action.payload.completed;
        }
      })
      .addCase(editTodo.fulfilled, (state, action) => {
        const todo = state.todos.find((todo) => todo._id === action.payload._id);
        if (todo) {
          todo.text = action.payload.text;
        }
      });
  },
});

export const { setFilter } = todoSlice.actions;
export default todoSlice.reducer;