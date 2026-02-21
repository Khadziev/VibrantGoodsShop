import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '@/app/providers/store';
import { Message } from '@/features/broadcast-message/Message/model/model';

export const apiMessage = createApi({
  reducerPath: 'apiMessage',
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
    broadcastMessage: builder.mutation<void, FormData>({
      query: (formData) => ({
        url: 'broadcast',
        method: 'POST',
        body: formData,
      }),
    }),
    getMessages: builder.query<Message[], void>({
      query: () => 'messages',
    }),
  }),
});

export const { useBroadcastMessageMutation, useGetMessagesQuery } = apiMessage;
