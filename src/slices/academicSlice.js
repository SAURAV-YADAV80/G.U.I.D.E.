import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

// Load state from localStorage
const loadState = () => {
  try {
    const serializedState = localStorage.getItem('academicsState');
    if (serializedState === null) {
      return {
        subjects: [],
        loading: false,
        error: null
      };
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return {
      subjects: [],
      loading: false,
      error: null
    };
  }
};

// Save state to localStorage
const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('academicsState', serializedState);
  } catch (err) {
    console.error('Could not save state', err);
  }
};

// Async thunk for fetching subjects
export const fetchSubjects = createAsyncThunk(
  'academics/fetchSubjects',
  async () => {
    try {
      const state = loadState();
      return state.subjects;
    } catch (error) {
      throw error;
    }
  }
);

const academicsSlice = createSlice({
  name: 'academics',
  initialState: loadState(),
  reducers: {
    addSubject: (state, action) => {
      const newSubject = {
        id: uuidv4(),
        name: action.payload.name,
        description: action.payload.description,
        syllabus: [],
        assignments: []
      };
      state.subjects.push(newSubject);
      saveState(state);
    },
    deleteSubject: (state, action) => {
      state.subjects = state.subjects.filter(subject => subject.id !== action.payload);
      saveState(state);
    },
    addSyllabus: (state, action) => {
      const { subjectId, syllabus } = action.payload;
      const subject = state.subjects.find(s => s.id === subjectId);
      if (subject) {
        subject.syllabus.push({
          id: uuidv4(),
          topic: syllabus.topic,
          completed: false
        });
      }
      saveState(state);
    },
    deleteSyllabus: (state, action) => {
      const { subjectId, syllabusId } = action.payload;
      const subject = state.subjects.find(s => s.id === subjectId);
      if (subject) {
        subject.syllabus = subject.syllabus.filter(item => item.id !== syllabusId);
      }
      saveState(state);
    },
    toggleSyllabus: (state, action) => {
      const { subjectId, syllabusId } = action.payload;
      const subject = state.subjects.find(s => s.id === subjectId);
      if (subject) {
        const syllabusItem = subject.syllabus.find(item => item.id === syllabusId);
        if (syllabusItem) {
          syllabusItem.completed = !syllabusItem.completed;
        }
      }
      saveState(state);
    },
    addAssignment: (state, action) => {
      const { subjectId, assignment } = action.payload;
      const subject = state.subjects.find(s => s.id === subjectId);
      if (subject) {
        subject.assignments.push({
          id: uuidv4(),
          ...assignment
        });
      }
      saveState(state);
    },
    deleteAssignment: (state, action) => {
      const { subjectId, assignmentId } = action.payload;
      const subject = state.subjects.find(s => s.id === subjectId);
      if (subject) {
        subject.assignments = subject.assignments.filter(item => item.id !== assignmentId);
      }
      saveState(state);
    },
    updateSubject: (state, action) => {
      const { id, updates } = action.payload;
      const subject = state.subjects.find(s => s.id === id);
      if (subject) {
        Object.assign(subject, updates);
      }
      saveState(state);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSubjects.fulfilled, (state, action) => {
        state.loading = false;
        state.subjects = action.payload;
      })
      .addCase(fetchSubjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

// Selectors
export const selectAllSubjects = (state) => state.academics.subjects;
export const selectLoading = (state) => state.academics.loading;
export const selectError = (state) => state.academics.error;
export const selectSubjectById = (state, subjectId) => 
  state.academics.subjects.find(subject => subject.id === subjectId);

export const {
  addSubject,
  deleteSubject,
  addSyllabus,
  deleteSyllabus,
  toggleSyllabus,
  addAssignment,
  deleteAssignment,
  updateSubject
} = academicsSlice.actions;

export default academicsSlice.reducer;