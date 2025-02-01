import { BaseQueryFn, createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../../store.ts";

type Args = {
  url: string;
  method: string;
  body?: any;
  headers?: HeadersInit;
};

const currentBaseQuery: BaseQueryFn<Args, unknown, unknown> = async (args, api, extraOptions) => {
  const state = api.getState() as RootState;

  const idInstance = state.sign.idInstance;

  const id = idInstance.substring(0, 4);

  const baseUrl = `https://${id}.api.green-api.com/waInstance${idInstance}`;

  const rawBaseQuery = fetchBaseQuery({ baseUrl });
  return rawBaseQuery(args, api, extraOptions);
};

export const messagesApi = createApi({
  reducerPath: "messagesApi",
  baseQuery: currentBaseQuery,
  endpoints: (builder) => ({
    sendMessage: builder.mutation({
      queryFn: async (body, api, _extraOptions, baseQuery) => {
        const state = api.getState() as RootState;

        const apiTokenInstance = state.sign.apiTokenInstance;

        const result = await baseQuery({
          url: `/sendMessage/${apiTokenInstance}`,
          method: "POST",
          body,
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (result.error) {
          return { error: result.error };
        }

        return { data: result.data };
      },
    }),
    getMessages: builder.mutation({
      queryFn: async (body, api, _extraOptions, baseQuery) => {
        const state = api.getState() as RootState;

        const apiTokenInstance = state.sign.apiTokenInstance;

        const result = await baseQuery({
          url: `/getChatHistory/${apiTokenInstance}`,
          method: "POST",
          body,
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (result.error) {
          return { error: result.error };
        }

        return { data: result.data };
      },
    }),
    getNotification: builder.mutation({
      queryFn: async (_, api, _extraOptions, baseQuery) => {
        const state = api.getState() as RootState;

        const apiTokenInstance = state.sign.apiTokenInstance;

        const result = await baseQuery({
          url: `/receiveNotification/${apiTokenInstance}?receiveTimeout=5`,
          method: "GET",
        });

        if (result.error) {
          return { error: result.error };
        }

        return { data: result.data };
      },
    }),
    deleteNotification: builder.mutation({
      queryFn: async ({ receiptId }, api, _extraOptions, baseQuery) => {
        const state = api.getState() as RootState;

        const apiTokenInstance = state.sign.apiTokenInstance;

        const result = await baseQuery({
          url: `/deleteNotification/${apiTokenInstance}/${receiptId}`,
          method: "DELETE",
        });

        if (result.error) {
          return { error: result.error };
        }

        return { data: result.data };
      },
    }),
  }),
});

export const {
  useSendMessageMutation,
  useGetMessagesMutation,
  useGetNotificationMutation,
  useDeleteNotificationMutation,
} = messagesApi;
