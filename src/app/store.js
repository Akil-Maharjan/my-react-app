import { articlesApi } from "../articles/articlesApi";
import { authApi } from "../features/auth/authApi";
import { userSlice } from "../pages/user/userSlice";
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from "@reduxjs/toolkit/query";
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from '../features/auth/authSlice'; // Import your authSlice reducer

// Persist configuration
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'], // Only persist the auth reducer
};

// Combine reducers
const rootReducer = {
  auth: authReducer, // Your auth reducer
  user: userSlice.reducer,
  [articlesApi.reducerPath]: articlesApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
};

// Create persisted reducer (only for auth)
const persistedAuthReducer = persistReducer(persistConfig, authReducer);

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer, // Only auth is persisted
    user: userSlice.reducer,
    [articlesApi.reducerPath]: articlesApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }).concat(articlesApi.middleware, authApi.middleware),
});

setupListeners(store.dispatch);

export const persistor = persistStore(store);