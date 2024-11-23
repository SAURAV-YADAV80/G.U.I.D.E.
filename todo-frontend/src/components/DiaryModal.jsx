import React from 'react';

 const DiaryModal = ({ diary, onClose }) => {
  return (
    <Modal onClose={onClose}>
      <div className="max-w-2xl bg-white p-6 rounded-lg shadow-lg border border-teal-100">
        <h2 className="text-xl font-semibold mb-4 text-teal-700">
          {new Date(diary.date).toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </h2>
        <div className="prose max-w-none">
          <p className="whitespace-pre-wrap text-teal-800">{diary.text}</p>
        </div>
      </div>
    </Modal>
  );
};

export default DiaryModal;