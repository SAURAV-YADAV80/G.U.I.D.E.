import { configureStore } from "@reduxjs/toolkit";
import todoReducer from './slices/todoSlice'
import diaryReducer from './slices/diarySlice'
import academicReducer from "./slices/academicSlice";
import authReducer from './slices/authSlice';
import moodReducer from './slices/moodSlice'
const store = configureStore({
  reducer: {
    todos: todoReducer,
    diary: diaryReducer,
    academics:academicReducer,
    auth: authReducer,
    mood: moodReducer,
  },
});

export default store;
