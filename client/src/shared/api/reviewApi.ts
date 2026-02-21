import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '@/app/providers/store';

export interface ReviewAttributes {
  userId: string;
  userName: string;
  rating: number;
  text: string;
}

export interface ReviewRequest {
  productId: string;
  review: ReviewAttributes;
}

export interface ReviewResponse extends ReviewAttributes {
  _id: string;
  productId: string;
  userId: string;
}

export const reviewApi = createApi({
  reducerPath: 'reviewApi',
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
  tagTypes: ['Reviews'],
  endpoints: (builder) => ({
    createReview: builder.mutation<void, ReviewRequest>({
      query: ({ productId, review }) => ({
        url: `/data/${productId}/reviews`,
        method: 'POST',
        body: review,
      }),
      invalidatesTags: [{ type: 'Reviews', id: 'LIST' }],
    }),
    getReviews: builder.query<ReviewResponse[], string>({
      query: (productId) => `/data/${productId}/reviews`,
      providesTags: [{ type: 'Reviews', id: 'LIST' }],
    }),
  }),
});

export const { useCreateReviewMutation, useGetReviewsQuery } = reviewApi;
