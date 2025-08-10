import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


 // Load environment variables

// Recommended: Use environment variables for base URL


export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'https://react-backend-topaz.vercel.app/api',
    credentials: 'include',
    
    // Add prepareHeaders here ▼
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      headers.set('Content-Type', 'application/json');
      return headers;
    }

    
  }),
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (data) => ({
        url: '/users/login',
        method: 'POST',
        body:{
          email: data.email.trim(),
          password: data.password
        },
        headers: {
          'Content-Type': 'application/json'
        }
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
        body: {
          username: data.username.trim(),
          email: data.email.trim(),
          password: data.password
        },
        headers: {
          'Content-Type': 'application/json'
        }
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