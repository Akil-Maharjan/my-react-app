import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  isAuthenticated: false
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    clearUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    }
  }
});

export const selectAuth = (state) => state.auth || initialState;
export const selectIsAuthenticated = (state) => (state.auth || initialState).isAuthenticated;
export const selectCurrentUser = (state) => (state.auth || initialState).user;

export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;