import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import DiaryEntry from '../components/DiaryEntry';
import DiaryList from '../components/DiaryList';
import DiaryModal from '../components/DiaryModal';
import { useDiaryManager } from '../hooks/useDiaryManager';

export default function Diary() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDiary, setSelectedDiary] = useState(null);
  const diaries = useSelector((state) => state.diary.diaries);
  const { input, setInput, isEditing, handleSaveDiary } = useDiaryManager();

  const handleOpenModal = (diary) => {
    setSelectedDiary(diary);
    setIsModalOpen(true);
  };

  return (
    <div className="container mx-auto p-4 bg-teal-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-4 text-center text-teal-800">My Daily Diary</h1>
      
      <DiaryEntry
        input={input}
        setInput={setInput}
        isEditing={isEditing}
        handleSaveDiary={handleSaveDiary}
      />
      
      <DiaryList 
        diaries={diaries}
        onViewEntry={handleOpenModal}
      />

      {isModalOpen && selectedDiary && (
        <DiaryModal
          diary={selectedDiary}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}