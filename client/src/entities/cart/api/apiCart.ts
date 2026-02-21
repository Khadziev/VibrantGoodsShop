import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '@/app/providers/store';
import { CartAttributes, RemoveFromCartArgs } from '@/entities/cart/ui/Basket/model/model';

export const apiCart = createApi({
  reducerPath: 'apiCart',
  tagTypes: ['cart'],
  baseQuery: fetchBaseQuery({
    baseUrl: '/api',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    addToCart: builder.mutation<CartAttributes, Partial<CartAttributes>>({
      query: (cartData) => ({
        url: '/cart',
        method: 'POST',
        body: cartData,
      }),
      invalidatesTags: ['cart'],
    }),
    removeFromCart: builder.mutation<CartAttributes, RemoveFromCartArgs>({
      query: ({ userId, productId }) => ({
        url: `/cart/${userId}/${productId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['cart'],
    }),
    getCartByUserId: builder.query<CartAttributes, string>({
      query: (userId) => `/cart/${userId}`,
      providesTags: ['cart'],
    }),
  }),
});

export const { useAddToCartMutation, useRemoveFromCartMutation, useGetCartByUserIdQuery } = apiCart;

export default apiCart;
