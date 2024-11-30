import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from 'redux-saga';
import { all } from 'redux-saga/effects';

import todoReducer from './slices/todoSlice';
import diaryReducer from './slices/diarySlice';
import academicReducer from "./slices/academicSlice";
import authReducer from './slices/authSlice';
import moodReducer from './slices/moodSlice';

// Import Sagas
import todoSagas from './sagas/todoSagas';
// import diarySagas from './sagas/diarySagas';
// import academicSagas from './sagas/academicSagas';
// import authSagas from './sagas/authSagas';
// import moodSagas from './sagas/moodSagas';

// Create Saga middleware
const sagaMiddleware = createSagaMiddleware();

// Root Saga
function* rootSaga() {
  yield all([
    todoSagas(),
    // diarySagas(),
    // academicSagas(),
    // authSagas(),
    // moodSagas()
  ]);
}

// Configure store
const store = configureStore({
  reducer: {
    todos: todoReducer,
    diary: diaryReducer,
    academics: academicReducer,
    auth: authReducer,
    mood: moodReducer,
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({ serializableCheck: false }).concat(sagaMiddleware)
});

// Run root saga
sagaMiddleware.run(rootSaga);

export default store;