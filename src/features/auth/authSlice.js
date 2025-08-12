// features/auth/authSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { setAuthToLocal, getAuthFromLocal, clearAuthFromLocal } from './local/local';

const initialState = {
  user: getAuthFromLocal()?.user || null,
  token: getAuthFromLocal()?.token || null,
  isAuthenticated: !!getAuthFromLocal(),
  isLoading: false,
  error: null
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.error = null;
      setAuthToLocal(action.payload);
    },
    clearUser: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      clearAuthFromLocal();
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    }
  }
});

// Selectors
export const selectAuth = (state) => state.auth;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectCurrentUser = (state) => state.auth.user;
export const selectToken = (state) => state.auth.token;
export const selectAuthLoading = (state) => state.auth.isLoading;
export const selectAuthError = (state) => state.auth.error;

export const { setUser, clearUser, setLoading, setError } = authSlice.actions;
export default authSlice.reducer;