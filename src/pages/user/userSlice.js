import { createSlice } from '@reduxjs/toolkit'
import { getUserFromLocal, setUserToLocal } from '../../features/auth/local/local.js'


export const userSlice = createSlice({
  name: 'user',
  initialState: {
    users: getUserFromLocal() || [],
  },
  reducers: {
    addUser: (state, action) => {
      state.users.push(action.payload);
      setUserToLocal(state.users);
    },
    deleteUser: (state, action) => {
      state.users = state.users.filter(user => user.idx !== action.payload);
      setUserToLocal(state.users);
    },
    updateUser: (state, action) => {
      const index = state.users.findIndex(user => user.idx === action.payload.idx);
      if (index !== -1) {
        state.users[index] = action.payload;
        setUserToLocal(state.users);
      }
    }
  }
})

export const { addUser, deleteUser, updateUser } = userSlice.actions

