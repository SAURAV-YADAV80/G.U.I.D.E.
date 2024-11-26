import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteAssignment } from '../slices/academicSlice';

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

  const getSortedAssignments = () => {
    return [...subject.assignments].sort((a, b) => {
      const compareA = sortBy === 'marks' ? Number(a.totalMarks) : new Date(a.dueDate);
      const compareB = sortBy === 'marks' ? Number(b.totalMarks) : new Date(b.dueDate);
      return sortOrder === 'asc' ? compareA - compareB : compareB - compareA;
    });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-semibold text-teal-800">Assignments</h3>
        <div className="flex gap-2">
          <button onClick={() => handleSort('dueDate')} className="text-sm text-teal-600 hover:text-teal-800">
            Due Date {sortBy === 'dueDate' && (sortOrder === 'asc' ? '↑' : '↓')}
          </button>
          <button onClick={() => handleSort('marks')} className="text-sm text-teal-600 hover:text-teal-800">
            Marks {sortBy === 'marks' && (sortOrder === 'asc' ? '↑' : '↓')}
          </button>
        </div>
      </div>
      <div className="space-y-2">
        {subject.assignments.length > 0 ? (
          getSortedAssignments().map((assignment) => (
            <div key={assignment.id} className="bg-teal-50 p-4 rounded-lg shadow-md hover:bg-teal-100">
              <div className="flex justify-between">
                <h4 className="font-medium text-teal-800">{assignment.name}</h4>
                <button
                  className="text-teal-300 hover:text-red-500 transition duration-200"
                  onClick={() => dispatch(deleteAssignment({ subjectId: subject.id, assignmentId: assignment.id }))}
                >
                  ✖
                </button>
              </div>
              <p className="text-sm text-teal-600">Due: {new Date(assignment.dueDate).toLocaleDateString()}</p>
              <p className="text-sm text-teal-600">Total Marks: {assignment.totalMarks}</p>
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