import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { DataAttributesApi } from '../types/types';
import { RootState } from '../store';


export const userApi = createApi({
  reducerPath: 'dataApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:4000/api/',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['data'],
  endpoints: (build) => ({
    fetchAllProducts: build.query<DataAttributesApi[], null>({
      query: () => ({
        url: '/data',
      }),
      providesTags: ['data'],
    }),
    fetchProductById: build.query<DataAttributesApi, any>({
      query: (id) => ({
        url: `/data/${id}`,
      }),
      providesTags: ['data'],
    }),
  }),
});

export const { useFetchAllProductsQuery, useFetchProductByIdQuery } = userApi;
