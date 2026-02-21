import { RootState } from '@/app/providers/store';
import { IBrand } from '@/widgets/Brands/model';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

export const apiBrand = createApi({
  reducerPath: 'apiBrand',
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
    getAllBrand: builder.query<IBrand[], void>({
      query: () => '/brand',
    }),
    addBrand: builder.mutation<IBrand, Partial<IBrand>>({
      query: (newSlider) => ({
        url: '/brand',
        method: 'POST',
        body: newSlider,
      }),
    }),
  }),
});

export const { useGetAllBrandQuery, useAddBrandMutation } = apiBrand;
