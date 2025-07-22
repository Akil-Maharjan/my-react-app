import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const articlesApi = createApi({
  reducerPath: "articlesApi",
  tagTypes: ['Article'],
  baseQuery: fetchBaseQuery({
    baseUrl: "https://687a1c1dabb83744b7eb7867.mockapi.io",
  }),
  endpoints: (builder) => ({
    getArticles: builder.query({
      query: () => ({
        url: "/articles",
        method: "GET",
      }),
      providesTags: (result) =>
        result
          ? [...result.map(({ id }) => ({ type: 'Article', id })), { type: 'Article', id: 'LIST' }]
          : [{ type: 'Article', id: 'LIST' }],
    }),
    getArticleById: builder.query({
      query: (id) => ({
        url: `/articles/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: 'Article', id }],
    }),
     addArticle: builder.mutation({
      query: (newArticle)=>({
        url: "/articles",
        body: newArticle,
        method: "POST",
      }),
      invalidatesTags: [{ type: 'Article', id: 'LIST' }],
     })
  }),
});

export const { useGetArticlesQuery, useGetArticleByIdQuery, useAddArticleMutation, useLazyGetArticleByIdQuery, useLazyGetArticlesQuery } = articlesApi;