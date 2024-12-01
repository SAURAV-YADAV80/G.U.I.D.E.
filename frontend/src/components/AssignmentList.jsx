import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteAssignment } from '../slices/academicSlice';
import { CheckCircle, XCircle } from 'lucide-react';

const AssignmentList = ({ subject }) => {
  const dispatch = useDispatch();
  const [sortBy, setSortBy] = useState('dueDate');
  const [sortOrder, setSortOrder] = useState('asc');

  const handleSort = (criteria) => {
    if (sortBy === criteria) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(criteria);
      setSortOrder('asc');
    }
  };

  console.log(subject.assignments, "assign")
  const getSortedAssignments = () => {
    return [...subject.assignments].sort((a, b) => {
      const compareA = sortBy === 'marks' ? Number(a.totalMarks) : new Date(a.dueDate);
      const compareB = sortBy === 'marks' ? Number(b.totalMarks) : new Date(b.dueDate);
      return sortOrder === 'asc' ? compareA - compareB : compareB - compareA;
    });
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg space-y-6 overflow-x-auto">
      <div className="flex items-center justify-between mb-4 flex-wrap">
        <h3 className="font-semibold text-teal-800 text-xl w-full sm:w-auto">Assignments</h3>
        <div className="flex gap-4 w-full sm:w-auto mt-4 sm:mt-0">
          <button
            onClick={() => handleSort('dueDate')}
            className={`text-sm font-medium text-teal-600 hover:text-teal-800 ${sortBy === 'dueDate' && 'font-bold'}`}
          >
            Due Date {sortBy === 'dueDate' && (sortOrder === 'asc' ? '↑' : '↓')}
          </button>
          <button
            onClick={() => handleSort('marks')}
            className={`text-sm font-medium text-teal-600 hover:text-teal-800 ${sortBy === 'marks' && 'font-bold'}`}
          >
            Marks {sortBy === 'marks' && (sortOrder === 'asc' ? '↑' : '↓')}
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {subject.assignments.length > 0 ? (
          getSortedAssignments().map((assignment) => (
            <div
              key={assignment.id}
              className="flex flex-col bg-teal-50 p-5 rounded-lg shadow-md hover:bg-teal-100 transition-colors duration-200"
            >
              <div className="flex justify-between items-center">
                <h4 className="text-teal-800 text-lg font-medium">{assignment.title}</h4>
                <button
                  className="text-teal-300 hover:text-red-500 transition duration-200"
                  onClick={() => dispatch(deleteAssignment({ subjectId: subject.id, assignmentId: assignment.id }))}
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>
              
              <h2 className="text-teal-800 text-sm font-medium">{assignment.description}</h2>
              {/* <p>{assignment.}</p> */}
              <p className="text-teal-600 text-sm">Due: {new Date(assignment.dueDate).toLocaleDateString()}</p>
              <p className="text-teal-600 text-xs">Total Marks: {assignment.totalMarks}</p>
            </div>
          ))
        ) : (
          <p className="text-teal-700 font-medium text-center mt-4">No assignments available</p>
        )}
      </div>
    </div>
  );
};

export default AssignmentList;