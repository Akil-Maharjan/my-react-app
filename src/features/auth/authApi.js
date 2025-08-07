import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Recommended: Use environment variables for base URL
const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: BASE_URL,
    // Global headers configuration
    prepareHeaders: (headers) => {
      headers.set('Content-Type', 'application/json');
      return headers;
    }
  }),
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (data) => ({
        url: '/users/login',
        method: 'POST',
        body: data
      })
    }),
    registerUser: builder.mutation({
      query: (data) => ({
        url: '/users/register',
        method: 'POST',
        body: data
      })
    })
  })
});

export const { useLoginUserMutation, useRegisterUserMutation } = authApi;