import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '@/app/providers/store';
import { DataAttributesApi } from '@/entities/product/model/model';

export const userApi = createApi({
  reducerPath: 'dataApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/',
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
    fetchProductById: build.query<DataAttributesApi, string>({
      query: (id: string) => ({
        url: `/data/${id}`,
      }),
      providesTags: ['data'],
    }),
    fetchDiscountedProducts: build.query<DataAttributesApi[], null>({
      query: () => ({
        url: '/discount',
      }),
      providesTags: ['data'],
    }),
    fetchSimilarProducts: build.query<DataAttributesApi[], string>({
      query: (productId) => ({
        url: `/data/${productId}/similar`,
      }),
      providesTags: ['data'],
    }),
  }),
});
export const {
  useFetchAllProductsQuery,
  useFetchProductByIdQuery,
  useFetchDiscountedProductsQuery,
  useFetchSimilarProductsQuery,
} = userApi;
