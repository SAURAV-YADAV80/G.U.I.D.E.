import { configureStore } from "@reduxjs/toolkit";
import todoReducer from './slices/todoSlice'
import diaryReducer from './slices/diarySlice'
import academicReducer from "./slices/academicSlice";
const store = configureStore({
  reducer: {
    todos: todoReducer,
    diary: diaryReducer,
    academics:academicReducer,
  },
});

export default store;
