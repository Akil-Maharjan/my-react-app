import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from "@reduxjs/toolkit/query";
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// APIs
import { articlesApi } from "../articles/articlesApi";
import { authApi } from "../features/auth/authApi";
import { productApi } from "../pages/Product/productApi";

// Slices
import authReducer from '../features/auth/authSlice';
import userReducer from '../pages/user/userSlice';
import {cartSlice} from '../pages/carts/cartSlice';

// Persist config (for auth only)
const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['user', 'token', 'isAuthenticated'] // Only persist these auth fields
};

export const store = configureStore({
  reducer: {
    auth: persistReducer(authPersistConfig, authReducer),
    user: userReducer,
    cart: cartSlice.reducer,
    [articlesApi.reducerPath]: articlesApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          'persist/PERSIST', 
          'persist/REHYDRATE',
          'persist/REGISTER'
        ],
        ignoredPaths: ['auth'] // Ignore persisted paths
      }
    }).concat(
      articlesApi.middleware,
      authApi.middleware,
      productApi.middleware
    ),
  
});

setupListeners(store.dispatch);

export const persistor = persistStore(store);