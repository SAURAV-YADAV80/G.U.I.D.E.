import { configureStore } from "@reduxjs/toolkit";
import todoReducer from './slices/todoSlice'
import diaryReducer from './slices/diarySlice'
import academicReducer from "./slices/academicSlice";
import authReducer from './slices/authSlice';
const store = configureStore({
  reducer: {
    todos: todoReducer,
    diary: diaryReducer,
    academics:academicReducer,
    auth: authReducer,
  },
});

export default store;
