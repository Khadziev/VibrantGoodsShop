import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RootState } from "../../app/providers/store";
import { DataAttributesApi } from '../model/ProductTypes';


export const AdminApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getData: builder.query<DataAttributesApi[], void>({
      query: () => '/data',
    }),
    addData: builder.mutation<DataAttributesApi, DataAttributesApi>({
      query: (newData) => ({
        url: '/data',
        method: 'POST',
        body: newData,
      }),
    }),
    deleteData: builder.mutation<void, string>({
      query: (id) => ({
        url: `/data/${id}`,
        method: 'DELETE',
      }),
    }),
    updateData: builder.mutation<DataAttributesApi, { id: string; newData: DataAttributesApi }>({
      query: ({ id, newData }) => ({
        url: `/data/${id}`,
        method: 'PUT',
        body: newData,
      }),
    }),
  }),
})

export const { useGetDataQuery, useAddDataMutation, useDeleteDataMutation, useUpdateDataMutation } = AdminApi;
