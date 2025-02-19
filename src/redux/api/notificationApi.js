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
    createNotification: builder.mutation({
      query: (data) => ({
        url: "/notifications/create-notification",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["notification"],
    }),
  }),
});

export const { useGetAllNotificationQuery, useCreateNotificationMutation } =
  notificationApi;

export default notificationApi;
