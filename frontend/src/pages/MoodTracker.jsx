import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  setCurrentDate, 
  setSelectedDate, 
  setIsModalOpen, 
  setNewMood, 
  addMood, 
  deleteMood 
} from '../slices/moodSlice';
import { CalendarDay } from '../components/CalendarDay';
import { MoodLegend } from '../components/MoodLegend';
import { CalendarHeader } from '../components/CalendarHeader';
import { MoodModal } from '../components/MoodModal';
import { MoodSelector } from '../components/MoodSelector';
import { MoodEntry } from '../components/MoodEntry';

const MoodTracker = () => {
  const dispatch = useDispatch();
  const { 
    moods, 
    currentDate, 
    selectedDate, 
    isModalOpen, 
    newMood 
  } = useSelector(state => state.mood);

  const moodColors = {
    1: { color: 'bg-red-500', label: 'Terrible', light: 'bg-red-100' },
    2: { color: 'bg-orange-400', label: 'Bad', light: 'bg-orange-100' },
    3: { color: 'bg-yellow-300', label: 'Okay', light: 'bg-yellow-100' },
    4: { color: 'bg-green-400', label: 'Good', light: 'bg-green-100' },
    5: { color: 'bg-green-600', label: 'Excellent', light: 'bg-green-200' },
  };

  const handlePrevMonth = () => {
    const date = new Date(currentDate);
    dispatch(setCurrentDate(new Date(date.getFullYear(), date.getMonth() - 1).toISOString()));
  };

  const handleNextMonth = () => {
    const date = new Date(currentDate);
    dispatch(setCurrentDate(new Date(date.getFullYear(), date.getMonth() + 1).toISOString()));
  };

  const handleDateSelect = (date) => {
    dispatch(setSelectedDate(date.toISOString()));
    dispatch(setIsModalOpen(true));
  };

  const handleAddMood = () => {
    if (!selectedDate) return;

    const newMoodEntry = {
      date: new Date(selectedDate).toISOString().split('T')[0],
      score: newMood.score,
      note: newMood.note,
      timestamp: new Date().toISOString(),
    };

    dispatch(addMood(newMoodEntry));
    dispatch(setNewMood({ score: 3, note: '' }));
    dispatch(setIsModalOpen(false));
  };

  const renderCalendar = () => {
    const date = new Date(currentDate);
    const daysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    const days = [];
    const todayStr = new Date().toISOString().split('T')[0];

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-24 " />);
    }

    // Calendar days
    for (let day = 1; day <= daysInMonth; day++) {
      const currentDay = new Date(date.getFullYear(), date.getMonth(), day);
      const dateStr = currentDay.toISOString().split('T')[0];
      const dayMoods = moods.filter(mood => mood.date === dateStr);
      const avgMood = dayMoods.length > 0
        ? Math.round(dayMoods.reduce((sum, mood) => sum + mood.score, 0) / dayMoods.length)
        : null;

      days.push(
        <CalendarDay
          key={day}
          day={day}
          dateStr={dateStr}
          avgMood={avgMood}
          isToday={dateStr === todayStr}
          moodColors={moodColors}
          onClick={() => handleDateSelect(currentDay)}
        />
      );
    }

    return days;
  };

  const isToday = selectedDate && 
    new Date(selectedDate).toISOString().split('T')[0] === new Date().toISOString().split('T')[0];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Mood Tracker</h1>

      <MoodLegend moodColors={moodColors} />

      <CalendarHeader
        currentDate={currentDate}
        onPrevMonth={handlePrevMonth}
        onNextMonth={handleNextMonth}
      />

      <div className="grid grid-cols-7 gap-1 mb-6">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} className="text-center font-semibold p-2">
            {day}
          </div>
        ))}
        {renderCalendar()}
      </div>

      <MoodModal
        isOpen={isModalOpen} 
        onClose={() => dispatch(setIsModalOpen(false))}
      >
        <h3 className="text-xl font-semibold mb-4">
          {selectedDate ? new Date(selectedDate).toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric'
          }) : ''}
        </h3>

        <div className="space-y-4">
          {isToday && (
            <>
              <MoodSelector
                moodColors={moodColors}
                selectedScore={newMood.score}
                onSelect={(score) => dispatch(setNewMood({ ...newMood, score }))}
              />

              <textarea
                value={newMood.note}
                onChange={(e) => dispatch(setNewMood({ ...newMood, note: e.target.value }))}
                placeholder="How are you feeling? (optional)"
                className="w-full p-2 border rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows="3"
              />

              <div className="flex gap-2">
                <button
                  onClick={handleAddMood}
                  className="flex-1 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Save Mood
                </button>
                <button
                  onClick={() => dispatch(setIsModalOpen(false))}
                  className="flex-1 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </>
          )}

          <div className="mt-6">
            <h4 className="font-semibold mb-2">
              {moods.filter(mood => mood.date === new Date(selectedDate).toISOString().split('T')[0]).length > 0
                ? 'Your Moods'
                : 'No moods logged.'}
            </h4>

            <div className="space-y-2">
              {moods
                .filter(mood => mood.date === new Date(selectedDate).toISOString().split('T')[0])
                .map((mood) => (
                  <MoodEntry
                    key={mood.timestamp}
                    mood={mood}
                    moodColors={moodColors}
                    isToday={isToday}
                    onDelete={(timestamp) => dispatch(deleteMood(timestamp))}
                  />
                ))}
            </div>
          </div>
        </div>
      </MoodModal>
    </div>
  );
};

export default MoodTracker;