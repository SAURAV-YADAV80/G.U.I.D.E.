import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteSyllabus, toggleSyllabus } from '../slices/academicSlice';

const SyllabusList = ({ subject }) => {
  const dispatch = useDispatch();

  return (
    <div className="mb-4">
      <h3 className="font-semibold text-teal-800 mb-2">Syllabus Progress</h3>
      <div className="space-y-2">
        {subject.syllabus.length > 0 ? (
          subject.syllabus.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-2 bg-teal-50 p-2 rounded hover:bg-teal-100 transition-colors duration-200"
            >
              <button
                className="text-teal-300 hover:text-red-500 transition duration-200"
                onClick={() => dispatch(deleteSyllabus({ subjectId: subject.id, syllabusId: item.id }))}
              >
                ✖
              </button>
              <button
                onClick={() => dispatch(toggleSyllabus({ subjectId: subject.id, syllabusId: item.id }))}
                className={`w-5 h-5 rounded border flex items-center justify-center ${
                  item.completed ? 'bg-emerald-500 border-emerald-500' : 'border-teal-300 hover:border-teal-500'
                }`}
              >
                {item.completed && <span className="text-white">✔</span>}
              </button>
              <span className={`${item.completed ? 'line-through text-teal-400' : 'text-teal-700'}`}>
                {item.topic}
              </span>
            </div>
          ))
        ) : (
          <p className="text-teal-700 font-medium text-center mt-4">No syllabus items to display</p>
        )}
      </div>
    </div>
  );
};

export default SyllabusList;