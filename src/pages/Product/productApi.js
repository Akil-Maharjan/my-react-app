import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseUrl } from '../../app/apiUrl';


export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),

  endpoints: (builder) => ({

    getProducts: builder.query({
      query: () => ({
        url: '/products',
        method: 'GET'
      }),
      providesTags: ['Products']
    }),

    getProduct: builder.query({
      query: (id) => ({
        url: `/products/${id}`,
        method: 'GET'
      }),
      providesTags: ['Products']

    }),

    addProduct: builder.mutation({
      query: (query) => ({
        url: '/products',
        body: query.data,
        headers: {
          Authorization: query.token
        },
        method: 'POST'
      }),
      invalidatesTags: ['Products']
    }),


    updateProduct: builder.mutation({
      query: (query) => ({
        url: `/products/${query.id}`,
        body: query.data,
        headers: {
          Authorization: query.token
        },
        method: 'PATCH'
      }),
      invalidatesTags: ['Products']
    }),


    removeProduct: builder.mutation({
      query: (query) => ({
        url: `/products/${query.id}`,
        headers: {
          Authorization: query.token
        },
        method: 'DELETE'
      }),
      invalidatesTags: ['Products']
    })


  })


});

export const { useGetProductsQuery, useGetProductQuery, useAddProductMutation, useRemoveProductMutation, useUpdateProductMutation } = productApi;
