// features/user/userSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { setUsersToLocal, getUsersFromLocal } from './userLocal';

const initialState = {
  users: getUsersFromLocal() || [],
  loading: false,
  error: null
};

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.users.push(action.payload);
      setUsersToLocal(state.users);
    },
    deleteUser: (state, action) => {
      state.users = state.users.filter(user => user.idx !== action.payload);
      setUsersToLocal(state.users);
    },
    updateUser: (state, action) => {
      const index = state.users.findIndex(user => user.idx === action.payload.idx);
      if (index !== -1) {
        state.users[index] = action.payload;
        setUsersToLocal(state.users);
      }
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    }
  }
});

export const { addUser, deleteUser, updateUser, setLoading, setError } = userSlice.actions;

// Selectors
export const selectAllUsers = (state) => state.user.users;
export const selectUsersLoading = (state) => state.user.loading;
export const selectUsersError = (state) => state.user.error;

export default userSlice.reducer;