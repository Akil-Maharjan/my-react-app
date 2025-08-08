import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


// Recommended: Use environment variables for base URL


export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: import.meta.env.VITE_API_BASE_URL + '/api', // Add /api prefix
    credentials: 'include', // For cookies if using sessions
    prepareHeaders: (headers) => {
      headers.set('Content-Type', 'application/json');
      // Add this for CORS preflight
      headers.set('Access-Control-Allow-Origin', import.meta.env.VITE_API_BASE_URL);
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