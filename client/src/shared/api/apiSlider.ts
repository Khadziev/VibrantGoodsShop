import { RootState } from '@/app/providers/store';
import { Slide } from '@/widgets/carousel/model/model';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

export const apiSidebar = createApi({
  reducerPath: 'apiSidebar',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      headers.delete('Content-Type');
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getAllSidebar: builder.query<Slide[], void>({
      query: () => '/slider',
    }),
    addSidebar: builder.mutation<Slide, Partial<Slide>>({
      query: (newSlider) => ({
        url: '/slider',
        method: 'POST',
        body: newSlider,
      }),
    }),
  }),
});

export const { useGetAllSidebarQuery, useAddSidebarMutation } = apiSidebar;
