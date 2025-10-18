import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define the Message type
export interface Message {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
}

// Define the API response type
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: unknown[];
}

// Create the API slice
export const messagesApi = createApi({
  reducerPath: 'messagesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8080/api/messages',
  }),
  tagTypes: ['Message'],
  endpoints: (builder) => ({
    // Get all messages
    getMessages: builder.query<Message[], void>({
      query: () => '',
      providesTags: ['Message'],
      transformResponse: (response: ApiResponse<Message[]>) => response.data || [],
    }),
    
    // Get single message
    getMessage: builder.query<Message, number>({
      query: (id) => `/${id}`,
      providesTags: (result, error, id) => [{ type: 'Message', id }],
      transformResponse: (response: ApiResponse<Message>) => response.data!,
    }),
    
    // Create message
    createMessage: builder.mutation<Message, { content: string }>({
      query: (newMessage) => ({
        url: '',
        method: 'POST',
        body: newMessage,
      }),
      invalidatesTags: ['Message'],
      transformResponse: (response: ApiResponse<Message>) => response.data!,
    }),
    
    // Update message
    updateMessage: builder.mutation<Message, { id: number; content: string }>({
      query: ({ id, content }) => ({
        url: `/${id}`,
        method: 'PUT',
        body: { content },
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Message', id }],
      transformResponse: (response: ApiResponse<Message>) => response.data!,
    }),
    
    // Delete message
    deleteMessage: builder.mutation<void, number>({
      query: (id) => ({
        url: `/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [{ type: 'Message', id }],
    }),
  }),
});

// Export hooks for usage in functional components
export const {
  useGetMessagesQuery,
  useGetMessageQuery,
  useCreateMessageMutation,
  useUpdateMessageMutation,
  useDeleteMessageMutation,
} = messagesApi;
