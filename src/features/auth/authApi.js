import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


 // Load environment variables

// Recommended: Use environment variables for base URL


export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'https://react-backend-topaz.vercel.app/api', // Add /api prefix
    credentials: 'include', // For cookies if using sessions
    prepareHeaders: (headers) => {
      headers.set('Content-Type', 'application/json');
      // Add this for CORS preflight
      headers.set('Accept', 'application/json');
      return headers;
    }
    
  }),
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (data) => ({
        url: '/users/login',
        method: 'POST',
        body: data
      }),
      transformResponse: (response) => response,
      transformErrorResponse: (response) => {
        return {
          status: response.status,
          data: response.data?.error || 'Login failed'
        }
      }
    }),
    registerUser: builder.mutation({
      query: (data) => ({
        url: '/users/register',
        method: 'POST',
        body: data
      }),
      transformResponse: (response) => response,
      transformErrorResponse: (response) => {
        return {
          status: response.status,
          data: response.data?.error || 'registration failed'
        }
      }
    })
  })

});


export const { useLoginUserMutation, useRegisterUserMutation } = authApi;