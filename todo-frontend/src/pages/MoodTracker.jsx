import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const MoodTracker = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [moods, setMoods] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newMood, setNewMood] = useState({ score: 3, note: '' });

  const moodColors = {
    1: { color: 'bg-red-500', label: 'Terrible', light: 'bg-red-100' },
    2: { color: 'bg-orange-400', label: 'Bad', light: 'bg-orange-100' },
    3: { color: 'bg-yellow-300', label: 'Okay', light: 'bg-yellow-100' },
    4: { color: 'bg-green-400', label: 'Good', light: 'bg-green-100' },
    5: { color: 'bg-green-600', label: 'Excellent', light: 'bg-green-200' },
  };

  useEffect(() => {
    const savedMoods = JSON.parse(localStorage.getItem('moods')) || [];
    setMoods(savedMoods);
  }, []);

  const getDaysInMonth = (date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const getFirstDayOfMonth = (date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay();

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setIsModalOpen(true);
  };

  const handleAddMood = () => {
    if (!selectedDate) return;

    const selectedDateStr = new Date(selectedDate).toISOString().split('T')[0];
    const newMoodEntry = {
      date: selectedDateStr,
      score: newMood.score,
      note: newMood.note,
      timestamp: new Date().toISOString(),
    };

    const updatedMoods = [...moods, newMoodEntry];
    setMoods(updatedMoods);
    localStorage.setItem('moods', JSON.stringify(updatedMoods));
    setNewMood({ score: 3, note: '' });
    setIsModalOpen(false);
  };

  const handleDeleteMood = (timestamp) => {
    const updatedMoods = moods.filter((mood) => mood.timestamp !== timestamp);
    setMoods(updatedMoods);
    localStorage.setItem('moods', JSON.stringify(updatedMoods));
  };

  const getDailyAverage = (date) => {
    const dayMoods = moods.filter((mood) => mood.date === date);
    if (dayMoods.length === 0) return null;
    const total = dayMoods.reduce((sum, mood) => sum + mood.score, 0);
    return Math.round(total / dayMoods.length);
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];
    const todayStr = new Date().toISOString().split('T')[0];

    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-24 border border-gray-200" />);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const dateStr = date.toISOString().split('T')[0];
      const avgMood = getDailyAverage(dateStr);
      const moodColor = avgMood ? moodColors[avgMood].color : 'bg-gray-100';
      const isToday = dateStr === todayStr;

      days.push(
        <div
          key={day}
          onClick={() => handleDateSelect(date)}
          className={`h-24 border border-gray-200 p-2 cursor-pointer ${
            isToday ? 'bg-blue-200' : moodColor
          } hover:bg-blue-300 bg-opacity-50`}
        >
          <span className="font-semibold">{day}</span>
        </div>
      );
    }

    return days;
  };

  const getModalHeader = () => {
    const today = new Date().toISOString().split('T')[0];
    const selectedDateStr = selectedDate?.toISOString().split('T')[0];

    if (selectedDateStr === today) return "Today's Moods";
    return selectedDate?.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };

  const isToday = selectedDate?.toISOString().split('T')[0] === new Date().toISOString().split('T')[0];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Mood Tracker</h1>

      <div className="flex flex-wrap gap-4 justify-center mb-6">
        {Object.entries(moodColors).map(([score, { color, label }]) => (
          <div key={score} className="flex items-center gap-2">
            <div className={`w-6 h-6 rounded ${color}`} />
            <span>{label}</span>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center mb-4">
        <button onClick={handlePrevMonth} className="p-2">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h2 className="text-xl font-semibold">
          {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
        </h2>
        <button onClick={handleNextMonth} className="p-2">
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-6">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} className="text-center font-semibold p-2">
            {day}
          </div>
        ))}
        {renderCalendar()}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center p-4 pt-20">
          <div className="relative bg-white rounded-lg p-6 max-w-lg w-full overflow-y-auto max-h-[90vh]">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-2 right-2 p-2 text-gray-600 hover:text-black"
              aria-label="Close"
            >
              &#10005;
            </button>

            <h3 className="text-xl font-semibold mb-4">{getModalHeader()}</h3>

            <div className="space-y-4">
              {isToday && (
                <>
                  <div className="flex gap-4 justify-center">
                    {Object.entries(moodColors).map(([score, { color, label }]) => (
                      <button
                        key={score}
                        onClick={() => setNewMood((prev) => ({ ...prev, score: parseInt(score) }))}
                        className={`w-10 h-10 rounded-full ${color} ${
                          newMood.score === parseInt(score) ? 'ring-2 ring-blue-500 ring-offset-2' : ''
                        }`}
                        title={label}
                      />
                    ))}
                  </div>

                  <textarea
                    value={newMood.note}
                    onChange={(e) => setNewMood((prev) => ({ ...prev, note: e.target.value }))}
                    placeholder="How are you feeling? (optional)"
                    className="w-full p-2 border rounded-lg"
                    rows="3"
                  />

                  <div className="flex gap-2">
                    <button
                      onClick={handleAddMood}
                      className="flex-1 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    >
                      Save Mood
                    </button>
                    <button
                      onClick={() => setIsModalOpen(false)}
                      className="flex-1 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
                    >
                      Cancel
                    </button>
                  </div>
                </>
              )}

              <div className="mt-6">
                <h4 className="font-semibold mb-2">
                  {moods.filter((mood) => mood.date === selectedDate?.toISOString().split('T')[0]).length > 0
                    ? 'Your Moods'
                    : 'No moods logged.'}
                </h4>

                <div className="space-y-2">
                  {moods
                    .filter((mood) => mood.date === selectedDate?.toISOString().split('T')[0])
                    .map((mood, idx) => (
                      <div
                        key={mood.timestamp || idx}
                        className={`flex items-center gap-4 p-3 rounded-lg ${
                          moodColors[mood.score].light
                        }`}
                      >
                        <div className={`w-8 h-8 rounded-full ${moodColors[mood.score].color}`} />
                        <div>
                          <p className="font-medium">{moodColors[mood.score].label}</p>
                          <p className="text-sm text-gray-600">{mood.note || 'No additional notes.'}</p>
                          <p className="text-xs text-gray-500">Recorded at {new Date(mood.timestamp).toLocaleString()}</p>
                        </div>

                        {isToday && (
                          <button
                            onClick={() => handleDeleteMood(mood.timestamp)}
                            className="text-gray-400 hover:text-red-500 ml-auto"
                          >
                            &#10005;
                          </button>
                        )}
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MoodTracker;