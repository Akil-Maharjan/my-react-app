import { createSlice } from '@reduxjs/toolkit'
import { setUsersToLocalStorage, getUsersFromLocalStorage } from '../../local/local'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    users: getUsersFromLocalStorage(),
  },
  reducers: {
    addUser: (state, action) => {
      state.users.push(action.payload);
      setUsersToLocalStorage(state.users);
    },
    deleteUser: (state, action) => {
      state.users = state.users.filter(user => user.idx !== action.payload);
      setUsersToLocalStorage(state.users);
    },
    updateUser: (state, action) => {
      const index = state.users.findIndex(user => user.idx === action.payload.idx);
      if (index !== -1) {
        state.users[index] = action.payload;
        setUsersToLocalStorage(state.users);
      }
    }
  }
})

export const { addUser, deleteUser, updateUser } = userSlice.actions

