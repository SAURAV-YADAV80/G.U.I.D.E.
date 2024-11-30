import { call, put, takeLatest, all, select } from 'redux-saga/effects';
import axios from 'axios';

const API_URL = "http://localhost:8080/api/todos";

// Saga Workers
function* fetchTodosSaga() {
  try {
    const response = yield call(axios.post, `${API_URL}/getTodos`, {email:localStorage.getItem('email')});
    yield put({ type: 'todos/fetchTodosSuccess', payload: response.data.todos });
  } catch (error) {
    yield put({ type: 'todos/fetchTodosFailure', payload: error.message });
  }
}


function* addTodoSaga(action) {
  try {
    const response = yield call(axios.post, `${API_URL}/addTodo`, { 
      text: action.payload, 
      email:localStorage.getItem('email'), 
    });
    yield put({ type: 'todos/addTodoSuccess', payload: response.data });
  } catch (error) {
    yield put({ type: 'todos/fetchTodosFailure', payload: error.message });
  }
}

function* removeTodoSaga(action) {
  try {
    yield call(axios.delete, `${API_URL}/deleteTodo/${action.payload}`);
    yield put({ type: 'todos/removeTodoSuccess', payload: action.payload });
  } catch (error) {
    yield put({ type: 'todos/fetchTodosFailure', payload: error.message });
  }
}

function* toggleCompleteSaga(action) {
  try {
    const todos = yield select(state => state.todos.todos);
    const todo = todos.find(t => t._id === action.payload);
    console.log(action.payload);
    const response = yield call(axios.patch, `${API_URL}/toggleTodo/${action.payload}`, { 
      completed: !todo.completed 
    });
    yield put({ type: 'todos/toggleCompleteSuccess', payload: response.data });
    window.location.reload();

  } catch (error) {
    yield put({ type: 'todos/fetchTodosFailure', payload: error.message });
  }
}

function* editTodoSaga(action) {
  try {
    // console.log(action.payload.id);
    const { id, text } = action.payload;
    const response = yield call(axios.patch, `${API_URL}/updateTodo/${id}`, { text, completed:false });
    yield put({ type: 'todos/editTodoSuccess', payload: response.data });
  } catch (error) {
    yield put({ type: 'todos/fetchTodosFailure', payload: error.message });
  }
}

// Saga Watchers
function* watchFetchTodos() {
  yield takeLatest('todos/fetchTodosRequest', fetchTodosSaga);
}

function* watchAddTodo() {
  yield takeLatest('todos/addTodoRequest', addTodoSaga);
}

function* watchRemoveTodo() {
  yield takeLatest('todos/removeTodoRequest', removeTodoSaga);
}

function* watchToggleComplete() {
  yield takeLatest('todos/toggleCompleteRequest', toggleCompleteSaga);
}

function* watchEditTodo() {
  yield takeLatest('todos/editTodoRequest', editTodoSaga);
}

// Root Saga
export default function* rootTodoSaga() {
  yield all([
    watchFetchTodos(),
    watchAddTodo(),
    watchRemoveTodo(),
    watchToggleComplete(),
    watchEditTodo()
  ]);
}