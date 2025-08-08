import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  token: null,  // Added token storage
  isAuthenticated: false
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      // Expecting payload format: { token, user }
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
    },
    clearUser: (state) => {
      state.user = null;
      state.token = null;  // Clear token too
      state.isAuthenticated = false;
    }
  }
});

// Selectors
export const selectAuth = (state) => state.auth || initialState;
export const selectIsAuthenticated = (state) => (state.auth || initialState).isAuthenticated;
export const selectCurrentUser = (state) => (state.auth || initialState).user;
export const selectToken = (state) => (state.auth || initialState).token;  // New token selector

export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;