import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';

export interface CartItem {
  productId: string;
  quantity: number;
}

export interface CartAttributes {
  userId: string;
  items: CartItem[];
}

export const apiCart = createApi({
  reducerPath: 'apiCart',
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
    }),
    removeFromCart: builder.mutation<CartAttributes, Partial<CartAttributes>>({
      query: (cartData) => ({
        url: '/cart/remove',
        method: 'POST',
        body: cartData,
      }),
    }),
    getCartByUserId: builder.query<CartAttributes, string>({
      query: (userId) => `/cart/${userId}`,
    }),
  }),
});

export const {
  useAddToCartMutation,
  useRemoveFromCartMutation,
  useGetCartByUserIdQuery,
} = apiCart;

export default apiCart;

