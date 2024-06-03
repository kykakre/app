import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const dialoguesApi = createApi({
  reducerPath: 'dialoguesApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api/dialogues' }),
  endpoints: (builder) => ({
    getDialogues: builder.query({
      query: () => 'dialogues',
    }),
  }),
});

export const { useGetDialoguesQuery } = dialoguesApi;