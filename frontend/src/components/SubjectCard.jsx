import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addAssignment, addSyllabus, deleteSubject } from '../slices/academicSlice';
import SyllabusList from './SyllabusList';
import AssignmentList from './AssignmentList';
import SyllabusModal from './SyllabusModal';
import AssignmentModal from './AssignmentModal';

const SubjectCard = ({ subject }) => {
  const dispatch = useDispatch();

  const [isAddSubjectOpen, setIsAddSubjectOpen] = useState(false);
  const [isSyllabusModalOpen, setIsSyllabusModalOpen] = useState(false);
  const [isAssignmentModalOpen, setIsAssignmentModalOpen] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [sortBy, setSortBy] = useState('dueDate');
  const [sortOrder, setSortOrder] = useState('asc');

  const [newSubject, setNewSubject] = useState({ name: '', description: '' });
  const [newSyllabus, setNewSyllabus] = useState({ topic: '', completed: false });
  const [newAssignment, setNewAssignment] = useState({
    title: '',
    description: '',
    dueDate: '',
    totalMarks: '',
  });


  const handleAddSyllabus = () => {
    dispatch(addSyllabus({ subjectId: selectedSubject.id, syllabus: newSyllabus }));
    setNewSyllabus({ topic: '', completed: false });
    setIsSyllabusModalOpen(false);
  };

  const handleAddAssignment = () => {
    dispatch(addAssignment({ subjectId: selectedSubject.id, assignment: newAssignment }));
    setNewAssignment({ title: '', description: '', dueDate: '', totalMarks: '' });
    setIsAssignmentModalOpen(false);
  };
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-200 border border-teal-100">
      <div className="flex justify-between items-start mb-4">
        <div>
          <button
            className="text-teal-300 hover:text-red-500 transition duration-200"
            onClick={() => dispatch(deleteSubject(subject.id))}
          >
            ✖
          </button>
          <h2 className="text-xl font-semibold text-teal-800">{subject.name}</h2>
          <p className="text-teal-600">{subject.description}</p>
        </div>
        <div className="flex gap-2">
          <button
          
            onClick={() => {
            setIsSyllabusModalOpen(true);
            setSelectedSubject(subject);
            }}
            className="flex items-center gap-1 bg-emerald-500 text-white px-3 py-1 rounded hover:bg-emerald-600 transition-colors duration-200"
          >
            Syllabus
          </button>
          <button
            onClick={() => {
            setSelectedSubject(subject);
            setIsAssignmentModalOpen(true);
            }}
            className="flex items-center gap-1 bg-teal-500 text-white px-3 py-1 rounded hover:bg-teal-600 transition-colors duration-200"
          >
            Assignment
          </button>
        </div>
      </div>

      {/* Syllabus Section */}
      <SyllabusList subject={subject} />

      {/* Assignments Section */}
      <AssignmentList subject={subject} />
      <SyllabusModal
        isOpen={isSyllabusModalOpen}
        onClose={() => setIsSyllabusModalOpen(false)}
        onAddSyllabus={handleAddSyllabus}
        syllabusData={newSyllabus}
        setSyllabusData={setNewSyllabus}
      />
      <AssignmentModal
        isOpen={isAssignmentModalOpen}
        onClose={() => setIsAssignmentModalOpen(false)}
        onAddAssignment={handleAddAssignment}
        assignmentData={newAssignment}
        setAssignmentData={setNewAssignment}
      />
    </div>
  );
};

export default SubjectCard;