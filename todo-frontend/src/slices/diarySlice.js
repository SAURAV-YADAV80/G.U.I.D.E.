// src/slices/diarySlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  diaries: [],
  currentDiary: null,
};

const diarySlice = createSlice({
  name: 'diary',
  initialState,
  reducers: {
    saveDiary: (state, action) => {
      const { date, text } = action.payload;
      const existingDiaryIndex = state.diaries.findIndex(diary => diary.date === date);
      
      if (existingDiaryIndex !== -1) {
        // Update existing diary
        state.diaries[existingDiaryIndex].text = text;
      } else {
        // Add new diary
        state.diaries.push({ date, text });
      }
      
      // Save to localStorage
      localStorage.setItem('diaries', JSON.stringify(state.diaries));
    },
    setDiaries: (state, action) => {
      state.diaries = action.payload;
    },
    resetDiaries: (state) => {
      // This will lock the current day's diary at midnight
      const currentDiaries = [...state.diaries];
      localStorage.setItem('diaries', JSON.stringify(currentDiaries));
    }
  }
});

export const { saveDiary, setDiaries, resetDiaries } = diarySlice.actions;
export default diarySlice.reducer;