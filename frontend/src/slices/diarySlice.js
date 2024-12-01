import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  diaries: [],
  currentDiary: null,
  loading: false,
  error: null,
};

const diarySlice = createSlice({
  name: 'diary',
  initialState,
  reducers: {
    fetchDiariesRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchDiariesSuccess: (state, action) => {
      state.loading = false;
      state.diaries = action.payload;
    },
    fetchDiariesFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    saveDiaryRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    saveDiarySuccess: (state, action) => {
      state.loading = false;
      const { date, text } = action.payload;
      const existingDiaryIndex = state.diaries.findIndex((diary) => diary.date === date);

      if (existingDiaryIndex !== -1) {
        state.diaries[existingDiaryIndex].text = text;
      } else {
        state.diaries.push(action.payload);
      }
    },
    saveDiaryFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchDiariesRequest,
  fetchDiariesSuccess,
  fetchDiariesFailure,
  saveDiaryRequest,
  saveDiarySuccess,
  saveDiaryFailure,
} = diarySlice.actions;

export default diarySlice.reducer;