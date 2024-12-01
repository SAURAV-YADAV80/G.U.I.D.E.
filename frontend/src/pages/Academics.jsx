import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Plus, BookOpen, Target, TrendingUp, Award } from 'lucide-react';
import { addSubject, fetchSubjects, selectAllSubjects, selectLoading, selectError } from '../slices/academicSlice';
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
    if (!newSubject.name.trim() || !newSubject.description.trim()) {
      alert('Both subject name and description are required!');
      return;
    }
    dispatch(addSubject(newSubject));
    setNewSubject({ name: '', description: '' });
    setIsAddSubjectOpen(false);
  };

  const calculateTotalStats = useMemo(() => {
    const totalSubjects = subjects.length;
    const totalSyllabusItems = subjects.reduce((sum, subject) => sum + subject.syllabus.length, 0);
    const totalAssignments = subjects.reduce((sum, subject) => sum + subject.assignments.length, 0);
    const completedSyllabus = subjects.reduce((sum, subject) => sum + subject.syllabus.filter(item => item.completed).length, 0);

    return { totalSubjects, totalSyllabusItems, totalAssignments, completedSyllabus };
  }, [subjects]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-teal-50 to-teal-100">
        <div className="text-center">
          <div className="animate-spin w-16 h-16 border-4 border-teal-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-teal-700 font-medium">Loading your academic dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gradient-to-br from-teal-50 to-teal-100 min-h-screen flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-lg text-center">
          <h2 className="text-2xl font-bold text-red-500 mb-4">Oops! Something went wrong</h2>
          <p className="text-teal-700 mb-4">{error}</p>
          <button
            onClick={() => dispatch(fetchSubjects())}
            className="bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-teal-100 p-6 md:p-10">
      <div className="mb-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-teal-800 mb-4 md:mb-0">
            Academic Dashboard
          </h1>
          <button
            onClick={() => setIsAddSubjectOpen(true)}
            className="flex items-center gap-2 bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors duration-200 shadow-md"
          >
            <Plus className="w-5 h-5" />
            Add Subject
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard
            icon={<BookOpen className="w-6 h-6 text-teal-600" />}
            value={calculateTotalStats.totalSubjects}
            label="Total Subjects"
          />
          <StatCard
            icon={<Target className="w-6 h-6 text-emerald-600" />}
            value={`${calculateTotalStats.completedSyllabus}/${calculateTotalStats.totalSyllabusItems}`}
            label="Syllabus Progress"
          />
          <StatCard
            icon={<TrendingUp className="w-6 h-6 text-blue-600" />}
            value={calculateTotalStats.totalAssignments}
            label="Assignments"
          />
          <StatCard
            icon={<Award className="w-6 h-6 text-purple-600" />}
            value={`${Math.round((calculateTotalStats.completedSyllabus / calculateTotalStats.totalSyllabusItems) * 100 || 0)}%`}
            label="Completion Rate"
          />
        </div>
      </div>

      <div className="space-y-6">
        {subjects.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {subjects.map((subject) => (
              <SubjectCard key={subject.id} subject={subject} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <img
              src="/api/placeholder/400/200"
              alt="No subjects"
              className="mx-auto mb-6 rounded-lg opacity-50"
            />
            <p className="text-teal-700 font-medium text-xl">
              No subjects available. Start by adding your first subject!
            </p>
            <button
              onClick={() => setIsAddSubjectOpen(true)}
              className="mt-4 bg-teal-500 text-white px-6 py-3 rounded-lg hover:bg-teal-600 transition-colors"
            >
              Add First Subject
            </button>
          </div>
        )}
      </div>

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

const StatCard = React.memo(({ icon, value, label }) => (
  <div className="bg-white rounded-xl shadow-md p-4 flex items-center gap-4 hover:shadow-lg transition-shadow">
    <div className="bg-teal-50 p-3 rounded-full">
      {icon}
    </div>
    <div>
      <p className="text-xl font-bold text-teal-800">{value}</p>
      <p className="text-sm text-teal-600">{label}</p>
    </div>
  </div>
));

export default Academics;