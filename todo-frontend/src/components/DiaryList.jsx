import React from 'react';

const DiaryList = ({ diaries, onViewEntry }) => {
  const sortedDiaries = [...diaries].sort((a, b) => 
    new Date(b.date) - new Date(a.date)
  );

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg border border-teal-100">
      <h2 className="text-xl font-semibold mb-4 text-teal-700">Previous Entries</h2>
      {sortedDiaries.length > 0 ? (
        <div className="space-y-4">
          {sortedDiaries.map((diary) => (
            <DiaryCard 
              key={diary.date} 
              diary={diary} 
              onView={() => onViewEntry(diary)} 
            />
          ))}
        </div>
      ) : (
        <p className="text-teal-500 text-center">No previous entries yet.</p>
      )}
    </div>
  );
};

export default DiaryList;