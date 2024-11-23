// src/features/moodSlice.js
import { createSlice } from '@reduxjs/toolkit';

const loadMoodsFromStorage = () => {
  try {
    const savedMoods = localStorage.getItem('moods');
    return savedMoods ? JSON.parse(savedMoods) : [];
  } catch (error) {
    console.error('Error loading moods from storage:', error);
    return [];
  }
};

const initialState = {
  moods: loadMoodsFromStorage(),
  currentDate: new Date().toISOString(),
  selectedDate: null,
  isModalOpen: false,
  newMood: { score: 3, note: '' }
};

const moodSlice = createSlice({
  name: 'mood',
  initialState,
  reducers: {
    setCurrentDate: (state, action) => {
      state.currentDate = action.payload;
    },
    setSelectedDate: (state, action) => {
      state.selectedDate = action.payload;
    },
    setIsModalOpen: (state, action) => {
      state.isModalOpen = action.payload;
    },
    setNewMood: (state, action) => {
      state.newMood = action.payload;
    },
    addMood: (state, action) => {
      state.moods.push(action.payload);
      localStorage.setItem('moods', JSON.stringify(state.moods));
    },
    deleteMood: (state, action) => {
      state.moods = state.moods.filter(mood => mood.timestamp !== action.payload);
      localStorage.setItem('moods', JSON.stringify(state.moods));
    }
  }
});

export const { 
  setCurrentDate, 
  setSelectedDate, 
  setIsModalOpen, 
  setNewMood, 
  addMood, 
  deleteMood 
} = moodSlice.actions;

export default moodSlice.reducer;
