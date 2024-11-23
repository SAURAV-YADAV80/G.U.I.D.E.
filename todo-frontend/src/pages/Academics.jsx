import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Plus } from 'lucide-react';
import {
  addSubject,
  fetchSubjects,
  selectAllSubjects,
  selectLoading,
  selectError,
} from '../slices/academicSlice';
import AddSubjectModal from '../components/AddSubjectModal';
import SubjectCard from '../components/SubjectCard';

const Academics = () => {
  const dispatch = useDispatch();
  const subjects = useSelector(selectAllSubjects);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  const [isAddSubjectOpen, setIsAddSubjectOpen] = useState(false);
  const [newSubject, setNewSubject] = useState({ name: '', description: '' });

  useEffect(() => {
    dispatch(fetchSubjects());
  }, [dispatch]);

  const handleAddSubject = () => {
    dispatch(addSubject(newSubject));
    setNewSubject({ name: '', description: '' });
    setIsAddSubjectOpen(false);
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen text-teal-600">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center p-4">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto p-4 bg-teal-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-teal-800">Academics</h1>
        <button
          onClick={() => setIsAddSubjectOpen(true)}
          className="flex items-center gap-2 bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors duration-200"
        >
          <Plus className="w-5 h-5" />
          Add Subject
        </button>
      </div>

      {/* Subjects List */}
      <div className="space-y-4">
        {subjects.length > 0 ? (
          subjects.map((subject) => (
            <SubjectCard key={subject.id} subject={subject} />
          ))
        ) : (
          <div className="text-center mt-8">
            <p className="text-teal-700 font-medium text-lg">No subjects available. Add some subjects to get started!</p>
          </div>
        )}
      </div>

      {/* Modals */}
      <AddSubjectModal
        isOpen={isAddSubjectOpen}
        onClose={() => setIsAddSubjectOpen(false)}
        onAddSubject={handleAddSubject}
        subjectData={newSubject}
        setSubjectData={setNewSubject}
      />
    </div>
  );
};

export default Academics;