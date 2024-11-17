// src/components/Diary.js
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveDiary, setDiaries, resetDiaries } from '../slices/diarySlice';
import Modal from '../components/Model';

export default function Diary() {
  const [input, setInput] = useState('');
  const [isEditing, setIsEditing] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDiary, setSelectedDiary] = useState(null);

  const diaries = useSelector((state) => state.diary.diaries);
  const dispatch = useDispatch();

  // Load initial diaries from localStorage
  useEffect(() => {
    const savedDiaries = JSON.parse(localStorage.getItem('diaries')) || [];
    dispatch(setDiaries(savedDiaries));
    
    // Set initial input if there's a diary for today
    const today = new Date().toISOString().split('T')[0];
    const todayDiary = savedDiaries.find(diary => diary.date === today);
    if (todayDiary) {
      setInput(todayDiary.text);
    }
  }, [dispatch]);

  // Handle midnight reset
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
        // Reload the page at midnight to start fresh
        window.location.reload();
      }, timeUntilMidnight);
    };

    const timeoutId = setupMidnightReset();
    return () => clearTimeout(timeoutId);
  }, [dispatch]);

  // Check if editing is allowed (only before midnight of the current day)
  useEffect(() => {
    const checkEditingStatus = () => {
      const now = new Date();
      const today = now.toISOString().split('T')[0];
      const todayDiary = diaries.find(diary => diary.date === today);
      
      // Allow editing if it's today and before midnight
      setIsEditing(true);
      
      if (todayDiary) {
        setInput(todayDiary.text);
      }
    };

    checkEditingStatus();
    // Check editing status every minute
    const interval = setInterval(checkEditingStatus, 60000);
    return () => clearInterval(interval);
  }, [diaries]);

  const handleSaveDiary = () => {
    if (input.trim()) {
      const today = new Date().toISOString().split('T')[0];
      dispatch(saveDiary({ date: today, text: input }));
    }
  };

  const handleOpenModal = (diary) => {
    setSelectedDiary(diary);
    setIsModalOpen(true);
  };

  // Sort diaries by date in descending order
  const sortedDiaries = [...diaries].sort((a, b) => 
    new Date(b.date) - new Date(a.date)
  );

  return (
    <div className="container mx-auto p-4 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-4 text-center">My Daily Diary</h1>

      {/* Today's Entry Section */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4">
          Today's Entry
          {!isEditing && <span className="text-red-500 text-sm ml-2">(Locked)</span>}
        </h2>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Write your thoughts for today..."
          className="w-full p-4 border rounded-lg mb-4 min-h-[200px]"
          disabled={!isEditing}
        />
        <div className="flex justify-between items-center">
          <button
            onClick={handleSaveDiary}
            disabled={!isEditing}
            className={`px-6 py-2 rounded-md ${
              isEditing
                ? 'bg-blue-500 hover:bg-blue-600 text-white'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Save Entry
          </button>
          {isEditing && (
            <span className="text-sm text-gray-500">
              Auto-locks at midnight
            </span>
          )}
        </div>
      </div>

      {/* Previous Entries Section */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Previous Entries</h2>
        {sortedDiaries.length > 0 ? (
          <div className="space-y-4">
            {sortedDiaries.map((diary) => (
              <div
                key={diary.date}
                className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold">
                    {new Date(diary.date).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </h3>
                  <button
                    onClick={() => handleOpenModal(diary)}
                    className="text-blue-500 hover:text-blue-600"
                  >
                    View Full Entry
                  </button>
                </div>
                <p className="text-gray-600 line-clamp-2">{diary.text}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center">No previous entries yet.</p>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && selectedDiary && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <div className="max-w-2xl">
            <h2 className="text-xl font-semibold mb-4">
              {new Date(selectedDiary.date).toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </h2>
            <div className="prose max-w-none">
              <p className="whitespace-pre-wrap">{selectedDiary.text}</p>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}