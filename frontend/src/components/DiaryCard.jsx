import React from 'react';

const DiaryCard = ({ diary, onView }) => {
  return (
    <div className="p-4 border border-teal-100 rounded-lg hover:bg-teal-50 transition-colors">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-semibold text-teal-800">
          {new Date(diary.date).toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </h3>
        <button
          onClick={onView}
          className="text-emerald-600 hover:text-emerald-700 transition-colors"
        >
          View Full Entry
        </button>
      </div>
      <p className="text-teal-600 line-clamp-2">{diary.text}</p>
    </div>
  );
};

export default DiaryCard;