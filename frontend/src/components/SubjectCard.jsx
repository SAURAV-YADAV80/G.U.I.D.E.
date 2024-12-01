import React, { useState, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { 
  Trash2, 
  BookOpen, 
  FileText, 
  Plus, 
  CheckCircle2, 
  Clock,
  AlertTriangle
} from 'lucide-react';
import { addAssignment, addSyllabus, deleteSubject } from '../slices/academicSlice';
import SyllabusList from './SyllabusList';
import AssignmentList from './AssignmentList';
import SyllabusModal from './SyllabusModal';
import AssignmentModal from './AssignmentModal';
import ProgressBar from './ProgressBar';
// import { toast } from 'react-toastify';

const SubjectCard = ({ subject }) => {
  const dispatch = useDispatch();
  const [isSyllabusModalOpen, setIsSyllabusModalOpen] = useState(false);
  const [isAssignmentModalOpen, setIsAssignmentModalOpen] = useState(false);
  const [newSyllabus, setNewSyllabus] = useState({ topic: '', completed: false });
  const [newAssignment, setNewAssignment] = useState({
    title: '',
    description: '',
    dueDate: '',
    totalMarks: '',
  });

  // Memoize progress calculation to prevent unnecessary re-renders
  const progress = useMemo(() => {
    const calculateProgress = () => {
      const totalSyllabusItems = subject.syllabus.length;
      const completedSyllabusItems = subject.syllabus.filter(item => item.completed).length;
      const syllabusProgress = totalSyllabusItems > 0 
        ? Math.round((completedSyllabusItems / totalSyllabusItems) * 100) 
        : 0;

      const totalAssignments = subject.assignments.length;
      const completedAssignments = subject.assignments.filter(
        assignment => new Date(assignment.dueDate) < new Date() && assignment.completed
      ).length;
      const assignmentProgress = totalAssignments > 0 
        ? Math.round((completedAssignments / totalAssignments) * 100) 
        : 0;

      return {
        syllabusProgress,
        assignmentProgress,
        totalSyllabusItems,
        completedSyllabusItems,
        totalAssignments,
        completedAssignments
      };
    };

    return calculateProgress();
  }, [subject.syllabus, subject.assignments]);

  const handleAddSyllabus = () => {
    if (!newSyllabus.topic.trim()) {
      toast.error('Syllabus topic cannot be empty');
      return;
    }

    dispatch(addSyllabus({ 
      subjectId: subject.id, 
      syllabus: {
        ...newSyllabus,
        id: `syl-${Date.now()}` // Generate unique ID
      } 
    }));
    setNewSyllabus({ topic: '', completed: false });
    setIsSyllabusModalOpen(false);
    toast.success('Syllabus item added successfully');
  };

  const handleAddAssignment = () => {
    const { title, description, dueDate, totalMarks } = newAssignment;

    // Validate assignment fields
    const validationErrors = [];
    if (!title.trim()) validationErrors.push('Title is required');
    if (!description.trim()) validationErrors.push('Description is required');
    if (!dueDate) validationErrors.push('Due date is required');
    if (!totalMarks || isNaN(totalMarks) || Number(totalMarks) <= 0) {
      validationErrors.push('Total marks must be a positive number');
    }

    if (validationErrors.length > 0) {
      validationErrors.forEach(error => toast.error(error));
      return;
    }

    dispatch(addAssignment({ 
      subjectId: subject.id, 
      assignment: {
        ...newAssignment,
        id: `ass-${Date.now()}`, // Generate unique ID
        completed: false
      } 
    }));
    setNewAssignment({ title: '', description: '', dueDate: '', totalMarks: '' });
    setIsAssignmentModalOpen(false);
    // toast.success('Assignment added successfully');
  };

  const handleDeleteSubject = () => {
    const confirmDelete = window.confirm(`Are you sure you want to delete the subject "${subject.name}"?`);
    if (confirmDelete) {
      dispatch(deleteSubject(subject.id));
      // toast.info(`Subject "${subject.name}" deleted`);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-teal-100 relative overflow-hidden">
      {/* Delete Subject Button */}
      <button
        onClick={handleDeleteSubject}
        className="absolute top-4 right-4 text-teal-400 hover:text-red-500 transition duration-200 z-10"
        title="Delete Subject"
      >
        <Trash2 className="w-5 h-5" />
      </button>

      {/* Subject Header */}
      <div className="bg-gradient-to-r from-teal-500 to-emerald-500 p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">{subject.name}</h2>
        <p className="text-teal-100 opacity-90">{subject.description}</p>
      </div>

      {/* Warnings Section */}
      {(progress.totalAssignments - progress.completedAssignments > 0 || 
        progress.totalSyllabusItems - progress.completedSyllabusItems > 0) && (
        <div className="bg-yellow-50 p-3 flex items-center gap-2 text-yellow-700">
          <AlertTriangle className="w-5 h-5" />
          <span>
            You have {progress.totalAssignments - progress.completedAssignments} pending assignments 
            and {progress.totalSyllabusItems - progress.completedSyllabusItems} incomplete syllabus items.
          </span>
        </div>
      )}

      {/* Action Buttons */}
      <div className="p-4 flex justify-between items-center border-b border-teal-100">
        <div className="flex gap-2">
          <button
            onClick={() => setIsSyllabusModalOpen(true)}
            className="flex items-center gap-2 bg-emerald-500 text-white px-3 py-2 rounded-lg hover:bg-emerald-600 transition-colors"
          >
            <BookOpen className="w-4 h-4" />
            Add Syllabus
          </button>
          <button
            onClick={() => setIsAssignmentModalOpen(true)}
            className="flex items-center gap-2 bg-teal-500 text-white px-3 py-2 rounded-lg hover:bg-teal-600 transition-colors"
          >
            <FileText className="w-4 h-4" />
            Add Assignment
          </button>
        </div>
      </div>

      {/* Progress Section */}
      <div className="p-4 grid md:grid-cols-2 gap-4">
        <ProgressSection 
          icon={<BookOpen className="w-5 h-5 text-emerald-600" />}
          title="Syllabus Progress"
          progress={progress.syllabusProgress}
          completed={progress.completedSyllabusItems}
          total={progress.totalSyllabusItems}
        />
        <AssignmentList subject={subject} />
      </div>

      {/* Lists Section */}
      <div className="p-4 grid md:grid-cols-2 gap-6">
        <SyllabusList subject={subject} />
      </div>

      {/* Modals */}
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

// Progress Section Component
const ProgressSection = ({ icon, title, progress, completed, total }) => (
  <div className="bg-teal-50 rounded-lg p-4">
    <div className="flex items-center gap-3 mb-3">
      <div className="bg-white p-2 rounded-full shadow-md">
        {icon}
      </div>
      <h3 className="font-semibold text-teal-800">{title}</h3>
    </div>
    <div className="flex items-center gap-3">
      <div className="flex-grow">
        <ProgressBar completed={completed} total={total} />
      </div>
    </div>
  </div>
);

export default SubjectCard;