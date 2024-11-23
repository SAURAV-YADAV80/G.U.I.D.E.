import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { saveDiary, setDiaries, resetDiaries } from '../slices/diarySlice';

export const useDiaryManager = () => {
  const [input, setInput] = useState('');
  const [isEditing, setIsEditing] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const savedDiaries = JSON.parse(localStorage.getItem('diaries')) || [];
    dispatch(setDiaries(savedDiaries));
    
    const today = new Date().toISOString().split('T')[0];
    const todayDiary = savedDiaries.find(diary => diary.date === today);
    if (todayDiary) {
      setInput(todayDiary.text);
    }
  }, [dispatch]);

  useEffect(() => {
    const setupMidnightReset = () => {
      const now = new Date();
      const tomorrow = new Date(now);
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(0, 0, 0, 0);
      
      const timeUntilMidnight = tomorrow - now;
      
      return setTimeout(() => {
        dispatch(resetDiaries());
        setIsEditing(false);
        setInput('');
        window.location.reload();
      }, timeUntilMidnight);
    };

    const timeoutId = setupMidnightReset();
    return () => clearTimeout(timeoutId);
  }, [dispatch]);

  const handleSaveDiary = () => {
    if (input.trim()) {
      const today = new Date().toISOString().split('T')[0];
      dispatch(saveDiary({ date: today, text: input }));
    }
  };

  return {
    input,
    setInput,
    isEditing,
    handleSaveDiary
  };
};