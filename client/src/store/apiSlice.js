import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Use REACT_APP_ env variable for Create React App
const baseURL = process.env.REACT_APP_BASE_URL || 'http://localhost:9090';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: baseURL }),
  endpoints: (builder) => ({
    // ✅ GET categories
    getCategories: builder.query({
      query: () => '/api/categories',
      providesTags: ['categories']
    }),

    // ✅ GET labels
    getLabels: builder.query({
      query: () => '/api/labels',
      providesTags: ['transaction']
    }),

    // ✅ ADD transaction
    addTransaction: builder.mutation({
      query: (initialTransaction) => ({
        url: '/api/transaction',
        method: 'POST',
        body: initialTransaction,
      }),
      invalidatesTags: ['transaction']
    }),

    // ✅ DELETE transaction
    deleteTransaction: builder.mutation({
      query: (recordId) => ({
        url: '/api/transaction',
        method: 'DELETE',
        body: recordId,
      }),
      invalidatesTags: ['transaction']
    }),
  }),
});

// ✅ Export all auto-generated hooks
export const {
  useGetCategoriesQuery,
  useGetLabelsQuery,
  useAddTransactionMutation,
  useDeleteTransactionMutation,
} = apiSlice;

export default apiSlice;
