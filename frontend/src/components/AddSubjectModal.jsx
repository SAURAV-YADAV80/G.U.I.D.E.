import React from 'react';
import PropTypes from 'prop-types';
import { X } from 'lucide-react'; // Replace with your preferred icon library

const AddSubjectModal = ({
  isOpen,
  onClose,
  onAddSubject,
  subjectData,
  setSubjectData,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-teal-800">Add New Subject</h3>
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
            placeholder="Subject Name"
            value={subjectData.name}
            onChange={(e) => setSubjectData({ ...subjectData, name: e.target.value })}
            className="w-full p-2 border border-teal-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          <textarea
            placeholder="Description"
            value={subjectData.description}
            onChange={(e) => setSubjectData({ ...subjectData, description: e.target.value })}
            className="w-full p-2 border border-teal-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
        <div className="flex justify-end gap-4 mt-4">
          <button
            onClick={onAddSubject}
            className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors duration-200"
          >
            Add Subject
          </button>
        </div>
      </div>
    </div>
  );
};

AddSubjectModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onAddSubject: PropTypes.func.isRequired,
  subjectData: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
  setSubjectData: PropTypes.func.isRequired,
};

export default AddSubjectModal;