import axios from 'axios';

const API_URL = 'http://localhost:8080/api/diary';

export const fetchDiaries = (email) =>
  axios.post(`${API_URL}/fetchDiary`, { email }).then((res) => res.data.msg);

export const saveDiary = (diary) =>
  axios.post(`${API_URL}/addDiary`, diary).then((res) => res.data);
