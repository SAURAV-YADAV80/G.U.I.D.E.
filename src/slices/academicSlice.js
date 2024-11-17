import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  subjects: [
    {
      id: 1,
      name: "Mathematics",
      description: "Advanced Calculus",
      syllabus: [
        { id: 1, topic: "Limits and Continuity", completed: true },
        { id: 2, topic: "Differentiation", completed: false }
      ],
      assignments: [
        {
          id: 1,
          title: "Integration Problems",
          description: "Solve 10 integration problems",
          dueDate: "2024-12-01",
          uploadDate: "2024-11-15",
          totalMarks: 100,
          completed: false
        }
      ]
    }
  ],
  loading: false,
  error: null
};

const academicsSlice = createSlice({
  name: 'academics',
  initialState,
  reducers: {
    // Subject actions
    addSubject: (state, action) => {
      const newSubject = {
        id: Date.now(),
        ...action.payload,
        syllabus: [],
        assignments: []
      };
      state.subjects.push(newSubject);
    },
    updateSubject: (state, action) => {
      const { id, ...updates } = action.payload;
      const subject = state.subjects.find(s => s.id === id);
      if (subject) {
        Object.assign(subject, updates);
      }
    },
    deleteSubject: (state, action) => {
      state.subjects = state.subjects.filter(subject => subject.id !== action.payload);
    },

    // Syllabus actions
    addSyllabus: (state, action) => {
      const { subjectId, syllabus } = action.payload;
      const subject = state.subjects.find(s => s.id === subjectId);
      if (subject) {
        subject.syllabus.push({
          id: Date.now(),
          ...syllabus,
          completed: false
        });
      }
    },
    updateSyllabus: (state, action) => {
      const { subjectId, syllabusId, ...updates } = action.payload;
      const subject = state.subjects.find(s => s.id === subjectId);
      if (subject) {
        const syllabus = subject.syllabus.find(s => s.id === syllabusId);
        if (syllabus) {
          Object.assign(syllabus, updates);
        }
      }
    },
    deleteSyllabus: (state, action) => {
      const { subjectId, syllabusId } = action.payload;
      const subject = state.subjects.find(s => s.id === subjectId);
      if (subject) {
        subject.syllabus = subject.syllabus.filter(s => s.id !== syllabusId);
      }
    },
    toggleSyllabus: (state, action) => {
      const { subjectId, syllabusId } = action.payload;
      const subject = state.subjects.find(s => s.id === subjectId);
      if (subject) {
        const syllabus = subject.syllabus.find(s => s.id === syllabusId);
        if (syllabus) {
          syllabus.completed = !syllabus.completed;
        }
      }
    },

    // Assignment actions
    addAssignment: (state, action) => {
      const { subjectId, assignment } = action.payload;
      const subject = state.subjects.find(s => s.id === subjectId);
      if (subject) {
        subject.assignments.push({
          id: Date.now(),
          ...assignment,
          uploadDate: new Date().toISOString().split('T')[0],
          completed: false
        });
      }
    },
    updateAssignment: (state, action) => {
      const { subjectId, assignmentId, ...updates } = action.payload;
      const subject = state.subjects.find(s => s.id === subjectId);
      if (subject) {
        const assignment = subject.assignments.find(a => a.id === assignmentId);
        if (assignment) {
          Object.assign(assignment, updates);
        }
      }
    },
    deleteAssignment: (state, action) => {
      const { subjectId, assignmentId } = action.payload;
      const subject = state.subjects.find(s => s.id === subjectId);
      if (subject) {
        subject.assignments = subject.assignments.filter(a => a.id !== assignmentId);
      }
    },
    toggleAssignmentComplete: (state, action) => {
      const { subjectId, assignmentId } = action.payload;
      const subject = state.subjects.find(s => s.id === subjectId);
      if (subject) {
        const assignment = subject.assignments.find(a => a.id === assignmentId);
        if (assignment) {
          assignment.completed = !assignment.completed;
        }
      }
    },

    // Async action states
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    }
  }
});

// Export actions
export const {
  addSubject,
  updateSubject,
  deleteSubject,
  addSyllabus,
  updateSyllabus,
  deleteSyllabus,
  toggleSyllabus,
  addAssignment,
  updateAssignment,
  deleteAssignment,
  toggleAssignmentComplete,
  setLoading,
  setError
} = academicsSlice.actions;

// Selectors
export const selectAllSubjects = state => state.academics.subjects;
export const selectSubjectById = (state, subjectId) => 
  state.academics.subjects.find(subject => subject.id === subjectId);
export const selectLoading = state => state.academics.loading;
export const selectError = state => state.academics.error;

// Optional: Thunk for async operations
export const fetchSubjects = () => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    // API call would go here
    // const response = await api.get('/subjects');
    // dispatch(setSubjects(response.data));
    dispatch(setLoading(false));
  } catch (error) {
    dispatch(setError(error.message));
    dispatch(setLoading(false));
  }
};

export default academicsSlice.reducer;