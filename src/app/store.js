import { articlesApi } from "../articles/articlesApi";
import { userSlice } from "../pages/user/userSlice";
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from "@reduxjs/toolkit/query";


export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    [articlesApi.reducerPath]: articlesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(articlesApi.middleware),
});

setupListeners(store.dispatch);
