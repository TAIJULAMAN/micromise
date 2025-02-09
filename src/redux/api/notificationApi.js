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
  }),
});

export const { useGetAllNotificationQuery } = notificationApi;

export default notificationApi;
