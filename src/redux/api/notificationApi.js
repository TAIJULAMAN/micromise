import { baseApi } from "./baseApi";

const notificationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllNotification: builder.query({
      query: (params) => ({
        url: "/notifications",
        method: "GET",
        params,
      }),
      providesTags: ["notification"],
    }),
    getAllNotificationReadAll: builder.query({
      query: () => ({
        url: "/notifications/read-all",
        method: "GET",
      }),
      providesTags: ["notification"],
    }),
  }),
});

export const { useGetAllNotificationQuery, useGetAllNotificationReadAllQuery } = notificationApi;

export default notificationApi;
