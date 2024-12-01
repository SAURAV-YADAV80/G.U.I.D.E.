import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteSyllabus, toggleSyllabus } from '../slices/academicSlice';
import { CheckCircle, XCircle } from 'lucide-react';

const SyllabusList = ({ subject }) => {
  const dispatch = useDispatch();

  // Determine if the list is scrollable (more than 3 syllabus items)
  const isScrollable = subject.syllabus.length > 3;

  return (
    <div className="w-full mb-6 p-4 bg-white shadow-lg rounded-lg">
      <h3 className="font-semibold text-teal-800 text-lg mb-4">Syllabus Progress</h3>
      
      <div
        className={`space-y-4 ${isScrollable ? 'max-h-96 overflow-y-auto scrollbar scrollbar-thumb-teal-700 scrollbar-track-teal-50' : ''}`}
      >
        {subject.syllabus.length > 0 ? (
          subject.syllabus.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between bg-teal-50 p-4 rounded-md hover:bg-teal-100 transition-colors w-full"
            >
              <div className="flex items-center gap-3">
                {/* Toggle completion */}
                <button
                  onClick={() => dispatch(toggleSyllabus({ subjectId: subject.id, syllabusId: item.id }))}
                  className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${
                    item.completed ? 'bg-emerald-500 border-emerald-500' : 'bg-white border-teal-300 hover:border-teal-500'
                  }`}
                >
                  {item.completed && <CheckCircle className="text-white w-5 h-5" />}
                </button>

                {/* Syllabus topic */}
                <span className={`text-lg font-medium ${item.completed ? 'line-through text-teal-400' : 'text-teal-700'}`}>
                  {item.topic}
                </span>
              </div>

              {/* Delete button */}
              <button
                onClick={() => dispatch(deleteSyllabus({ subjectId: subject.id, syllabusId: item.id }))}
                className="text-red-500 hover:text-red-700 transition duration-200"
              >
                <XCircle className="w-6 h-6" />
              </button>
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