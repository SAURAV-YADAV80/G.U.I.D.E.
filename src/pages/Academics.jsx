import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Plus, Book, FileText, Check, Edit2, Calendar, Award, X, ChevronUp, ChevronDown } from 'lucide-react';
import {
  addSubject,
  addSyllabus,
  addAssignment,
  toggleSyllabus,
  selectAllSubjects,
  selectLoading,
  selectError,
  fetchSubjects
} from '../slices/academicSlice';

const Academics = () => {
  const dispatch = useDispatch();
  const subjects = useSelector(selectAllSubjects);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  const [isAddSubjectOpen, setIsAddSubjectOpen] = useState(false);
  const [isSyllabusModalOpen, setIsSyllabusModalOpen] = useState(false);
  const [isAssignmentModalOpen, setIsAssignmentModalOpen] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [sortBy, setSortBy] = useState('dueDate');
  const [sortOrder, setSortOrder] = useState('asc');

  // Local state for forms
  const [newSubject, setNewSubject] = useState({ name: '', description: '' });
  const [newSyllabus, setNewSyllabus] = useState({ topic: '', completed: false });
  const [newAssignment, setNewAssignment] = useState({
    title: '',
    description: '',
    dueDate: '',
    totalMarks: '',
  });

  // Fetch subjects on component mount
  useEffect(() => {
    dispatch(fetchSubjects());
  }, [dispatch]);

  const handleAddSubject = () => {
    dispatch(addSubject(newSubject));
    setNewSubject({ name: '', description: '' });
    setIsAddSubjectOpen(false);
  };

  const handleAddSyllabus = () => {
    dispatch(addSyllabus({ 
      subjectId: selectedSubject.id, 
      syllabus: newSyllabus 
    }));
    setNewSyllabus({ topic: '', completed: false });
    setIsSyllabusModalOpen(false);
  };

  const handleAddAssignment = () => {
    dispatch(addAssignment({ 
      subjectId: selectedSubject.id, 
      assignment: newAssignment 
    }));
    setNewAssignment({ title: '', description: '', dueDate: '', totalMarks: '' });
    setIsAssignmentModalOpen(false);
  };

  const handleToggleSyllabus = (subjectId, syllabusId) => {
    dispatch(toggleSyllabus({ subjectId, syllabusId }));
  };

  const handleSort = (criteria) => {
    if (sortBy === criteria) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(criteria);
      setSortOrder('asc');
    }
  };

  // Sort assignments based on current sort criteria
  const getSortedAssignments = (assignments) => {
    return [...assignments].sort((a, b) => {
      let compareA = a[sortBy === 'marks' ? 'totalMarks' : 'dueDate'];
      let compareB = b[sortBy === 'marks' ? 'totalMarks' : 'dueDate'];
      
      if (sortBy === 'marks') {
        compareA = Number(compareA);
        compareB = Number(compareB);
      }
      
      if (sortOrder === 'asc') {
        return compareA > compareB ? 1 : -1;
      } else {
        return compareA < compareB ? 1 : -1;
      }
    });
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center p-4">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Academics</h1>
        <button
          onClick={() => setIsAddSubjectOpen(true)}
          className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          <Plus className="w-5 h-5" />
          Add Subject
        </button>
      </div>

      {/* Subjects List */}
      <div className="space-y-4">
        {subjects.map(subject => (
          <div key={subject.id} className="bg-white rounded-lg shadow-md p-4">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-xl font-semibold">{subject.name}</h2>
                <p className="text-gray-600">{subject.description}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setSelectedSubject(subject);
                    setIsSyllabusModalOpen(true);
                  }}
                  className="flex items-center gap-1 bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                >
                  <Book className="w-4 h-4" />
                  Syllabus
                </button>
                <button
                  onClick={() => {
                    setSelectedSubject(subject);
                    setIsAssignmentModalOpen(true);
                  }}
                  className="flex items-center gap-1 bg-purple-500 text-white px-3 py-1 rounded hover:bg-purple-600"
                >
                  <FileText className="w-4 h-4" />
                  Assignment
                </button>
              </div>
            </div>

            {/* Syllabus Section */}
            <div className="mb-4">
              <h3 className="font-semibold mb-2">Syllabus Progress</h3>
              <div className="space-y-2">
                {subject.syllabus.map(item => (
                  <div key={item.id} className="flex items-center gap-2 bg-gray-50 p-2 rounded">
                    <button
                      onClick={() => handleToggleSyllabus(subject.id, item.id)}
                      className={`w-5 h-5 rounded border flex items-center justify-center ${
                        item.completed ? 'bg-green-500 border-green-500' : 'border-gray-300'
                      }`}
                    >
                      {item.completed && <Check className="w-4 h-4 text-white" />}
                    </button>
                    <span className={item.completed ? 'line-through text-gray-500' : ''}>
                      {item.topic}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Assignments Section */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold">Assignments</h3>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleSort('dueDate')}
                    className="flex items-center gap-1 text-sm text-gray-600"
                  >
                    Due Date {sortBy === 'dueDate' && (sortOrder === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />)}
                  </button>
                  <button
                    onClick={() => handleSort('marks')}
                    className="flex items-center gap-1 text-sm text-gray-600"
                  >
                    Marks {sortBy === 'marks' && (sortOrder === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />)}
                  </button>
                </div>
              </div>
              <div className="space-y-2">
                {getSortedAssignments(subject.assignments).map(assignment => (
                  <div key={assignment.id} className="bg-gray-50 p-3 rounded">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">{assignment.title}</h4>
                        <p className="text-sm text-gray-600">{assignment.description}</p>
                      </div>
                      <div className="flex gap-2">
                        <span className="flex items-center gap-1 text-sm text-gray-600">
                          <Calendar className="w-4 h-4" />
                          {new Date(assignment.dueDate).toLocaleDateString()}
                        </span>
                        <span className="flex items-center gap-1 text-sm text-gray-600">
                          <Award className="w-4 h-4" />
                          {assignment.totalMarks} marks
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Subject Modal */}
      {isAddSubjectOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Add New Subject</h2>
              <button onClick={() => setIsAddSubjectOpen(false)}>
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Subject Name</label>
                <input
                  type="text"
                  value={newSubject.name}
                  onChange={(e) => setNewSubject({ ...newSubject, name: e.target.value })}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea
                  value={newSubject.description}
                  onChange={(e) => setNewSubject({ ...newSubject, description: e.target.value })}
                  className="w-full p-2 border rounded"
                  rows="3"
                />
              </div>
              <button
                onClick={handleAddSubject}
                className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
              >
                Add Subject
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Syllabus Modal */}
      {isSyllabusModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Add Syllabus Topic</h2>
              <button onClick={() => setIsSyllabusModalOpen(false)}>
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Topic</label>
                <input
                  type="text"
                  value={newSyllabus.topic}
                  onChange={(e) => setNewSyllabus({ ...newSyllabus, topic: e.target.value })}
                  className="w-full p-2 border rounded"
                />
              </div>
              <button
                onClick={handleAddSyllabus}
                className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
              >
                Add Topic
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Assignment Modal */}
      {isAssignmentModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Add Assignment</h2>
              <button onClick={() => setIsAssignmentModalOpen(false)}>
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Title</label>
                <input
                  type="text"
                  value={newAssignment.title}
                  onChange={(e) => setNewAssignment({ ...newAssignment, title: e.target.value })}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea
                  value={newAssignment.description}
                  onChange={(e) => setNewAssignment({ ...newAssignment, description: e.target.value })}
                  className="w-full p-2 border rounded"
                  rows="3"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Due Date</label>
                <input
                  type="date"
                  value={newAssignment.dueDate}
                  onChange={(e) => setNewAssignment({ ...newAssignment, dueDate: e.target.value })}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Total Marks</label>
                <input
                  type="number"
                  value={newAssignment.totalMarks}
                  onChange={(e) => setNewAssignment({ ...newAssignment, totalMarks: e.target.value })}
                  className="w-full p-2 border rounded"
                />
              </div>
              <button
                onClick={handleAddAssignment}
                className="w-full bg-purple-500 text-white py-2 rounded hover:bg-purple-600"
              >
                Add Assignment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Academics;