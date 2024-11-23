import React from 'react';
import PropTypes from 'prop-types';
import { X } from 'lucide-react'; // Assuming you're using a library like FontAwesome for the X icon

const AssignmentModal = ({
  isOpen,
  onClose,
  onAddAssignment,
  assignmentData,
  setAssignmentData,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-teal-800">Add Assignment</h3>
          <button
            onClick={onClose}
            className="text-teal-600 hover:text-teal-800"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Assignment Title"
            value={assignmentData.title}
            onChange={(e) => setAssignmentData({ ...assignmentData, title: e.target.value })}
            className="w-full p-2 border border-teal-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          <textarea
            placeholder="Assignment Description"
            value={assignmentData.description}
            onChange={(e) => setAssignmentData({ ...assignmentData, description: e.target.value })}
            className="w-full p-2 border border-teal-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          <input
            type="date"
            value={assignmentData.dueDate}
            onChange={(e) => setAssignmentData({ ...assignmentData, dueDate: e.target.value })}
            className="w-full p-2 border border-teal-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          <input
            type="number"
            placeholder="Total Marks"
            value={assignmentData.totalMarks}
            onChange={(e) => setAssignmentData({ ...assignmentData, totalMarks: e.target.value })}
            className="w-full p-2 border border-teal-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
        <div className="flex justify-end gap-4 mt-4">
          <button
            onClick={onAddAssignment}
            className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors duration-200"
          >
            Add Assignment
          </button>
        </div>
      </div>
    </div>
  );
};

AssignmentModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onAddAssignment: PropTypes.func.isRequired,
  assignmentData: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    dueDate: PropTypes.string,
    totalMarks: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }).isRequired,
  setAssignmentData: PropTypes.func.isRequired,
};

export default AssignmentModal;