import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../../app/providers/store';
import { Message } from '../model/MessageTypes';




export const apiMessage = createApi({
  reducerPath: 'apiMessage',
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
    broadcastMessage: builder.mutation<Message, Message>({
      query: (message) => ({
        url: 'broadcast',
        method: 'POST',
        body: message,
      }),
    }),
    getMessages: builder.query<Message[], void>({
      query: () => 'messages',
    }),
  }),
});

export const { useBroadcastMessageMutation, useGetMessagesQuery } = apiMessage;
