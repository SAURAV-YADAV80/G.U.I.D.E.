import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: localStorage.getItem('name') || null, // Directly get the string
  isAuthenticated: !!localStorage.getItem('name'),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      localStorage.setItem('name', state.user); // Directly store the string
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem('name');
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
