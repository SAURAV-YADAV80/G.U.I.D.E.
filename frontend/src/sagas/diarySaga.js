import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import {
  fetchDiariesRequest,
  fetchDiariesSuccess,
  fetchDiariesFailure,
  saveDiaryRequest,
  saveDiarySuccess,
  saveDiaryFailure,
} from '../slices/diarySlice';

// API Endpoints
const API_BASE_URL = 'http://localhost:8080/api/diary'; // Replace with your backend URL

function fetchDiariesAPI(email) {
  return axios.post(`${API_BASE_URL}/fetchDiary`, { email });
}

// Worker saga: Fetch diaries
function* fetchDiariesSaga(action) {
  try {
    const response = yield call(fetchDiariesAPI, action.payload.email);
    yield put(fetchDiariesSuccess(response.data.msg));
  } catch (error) {
    yield put(fetchDiariesFailure(error.message));
  }
}
async function saveDiaryAPI(diary) {
  console.log('Saving diary for date: %s with content: %o', diary.date, diary.text);

  try {
    const response = await axios.post(`${API_BASE_URL}/addDiary`, diary);
    console.log('Diary saved successfully: %o', response.data);
    return response.data; // Return only the result from the save operation
  } catch (error) {
    console.error('Error saving diary: %o', error.response?.data || error.message);
    throw error.response?.data?.msg || 'An error occurred while saving the diary.';
  }
}

function* saveDiarySaga(action) {
  try {
    const response = yield call(saveDiaryAPI, action.payload);

    
    const email = localStorage.getItem('email');
    const response2 = yield call(axios.post, `${API_BASE_URL}/fetchDiary`, { email });

    
    yield put(fetchDiariesSuccess(response2.data.msg));

    const successMessage = response.msg || 'Diary added/updated successfully!';  
    yield put(saveDiarySuccess(successMessage));
  } catch (error) {
    const errorMessage = error.message || 'Something went wrong, please try again.'; 
    yield put(saveDiaryFailure(errorMessage));
  }
}


// Watcher saga
export default function* diarySaga() {
  yield takeLatest(fetchDiariesRequest.type, fetchDiariesSaga);
  yield takeLatest(saveDiaryRequest.type, saveDiarySaga);
}