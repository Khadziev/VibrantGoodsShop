import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface Pay {
  _id?: string;
  amount: number;
  currency?: string;
  status?: string;
  createdAt?: string;
}

export const paymentsApi = createApi({
  reducerPath: 'paymentsApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  tagTypes: ['Payment'],
  endpoints: (builder) => ({
    getAllPayments: builder.query<Pay[], void>({
      query: () => '/payments',
    }),
    createPayment: builder.mutation<Pay, Partial<Pay>>({
      query: (newPayment) => ({
        url: '/payments',
        method: 'POST',
        body: newPayment,
      }),
    }),
  }),
});

export const { useGetAllPaymentsQuery, useCreatePaymentMutation } = paymentsApi;
