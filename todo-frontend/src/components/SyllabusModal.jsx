import React from 'react';
import PropTypes from 'prop-types';
import { X } from 'lucide-react'; // Replace with your preferred icon library

const SyllabusModal = ({
  isOpen,
  onClose,
  onAddSyllabus,
  syllabusData,
  setSyllabusData,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-teal-800">Add Syllabus</h3>
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
            placeholder="Syllabus Topic"
            value={syllabusData.topic}
            onChange={(e) => setSyllabusData({ ...syllabusData, topic: e.target.value })}
            className="w-full p-2 border border-teal-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={syllabusData.completed}
              onChange={(e) => setSyllabusData({ ...syllabusData, completed: e.target.checked })}
              className="w-4 h-4 text-teal-600"
            />
            <label className="text-teal-600">Completed</label>
          </div>
        </div>
        <div className="flex justify-end gap-4 mt-4">
          <button
            onClick={onAddSyllabus}
            className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors duration-200"
          >
            Add Syllabus
          </button>
        </div>
      </div>
    </div>
  );
};

SyllabusModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onAddSyllabus: PropTypes.func.isRequired,
  syllabusData: PropTypes.shape({
    topic: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  }).isRequired,
  setSyllabusData: PropTypes.func.isRequired,
};

export default SyllabusModal;
