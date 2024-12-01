import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import DiaryEntry from '../components/DiaryEntry';
import DiaryList from '../components/DiaryList';
import DiaryModal from '../components/DiaryModal';
import {
  fetchDiariesRequest,
  saveDiaryRequest,
} from '../slices/diarySlice';

export default function Diary() {
  const dispatch = useDispatch();
  const { diaries, loading, error } = useSelector((state) => state.diary);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDiary, setSelectedDiary] = useState(null);
  const [input, setInput] = useState('');

  useEffect(() => {
    const email = localStorage.getItem('email');
    dispatch(fetchDiariesRequest({ email }));
  }, [dispatch]);

  useEffect(() => {
    // Initialize input with today's diary text if available
    const todayDate = new Date().toISOString().split('T')[0];
    const todayDiary = diaries.find(diary => diary.date === todayDate);
    if (todayDiary) {
      setInput(todayDiary.text);
    } else {
      setInput('');
    }
  }, [diaries]);

  const handleSaveDiary = () => {
    const diaryData = {
      date: new Date().toISOString().split('T')[0], // Current date
      text: input,
      email: localStorage.getItem('email'),
    };
    dispatch(saveDiaryRequest(diaryData));
    setInput(''); // Reset input after saving
  };

  const handleOpenModal = (diary) => {
    setSelectedDiary(diary);
    setIsModalOpen(true);
  };

  const validDiaries = diaries.filter(diary => !isNaN(new Date(diary.date)));

  return (
    <div className="container mx-auto p-4 bg-teal-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-4 text-center text-teal-800">My Daily Diary</h1>
      <DiaryEntry
        input={input}
        setInput={setInput}
        isEditing={!loading}
        handleSaveDiary={handleSaveDiary}
      />
      {loading ? (
        <p className="text-center text-teal-500">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <DiaryList diaries={validDiaries} onViewEntry={handleOpenModal} />
      )}
      {isModalOpen && selectedDiary && (
        <DiaryModal
          diary={selectedDiary}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}