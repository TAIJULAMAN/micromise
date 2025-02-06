import { baseApi } from "./baseApi";

const profileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    editAdminProfile: builder.mutation({
      query: ({ data, _id }) => ({
        url: `/users${_id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Profile"],
    }),

    changeAdminPassword: builder.mutation({
      query: (data) => ({
        url: "/auth/change-password",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useEditAdminProfileMutation, useChangeAdminPasswordMutation } =
  profileApi;

export default profileApi;
