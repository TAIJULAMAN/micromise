import { baseApi } from "./baseApi";

const profileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    editAdmin: builder.mutation({
      query: ({ data, _id }) => ({
        url: `/users/${_id}`,
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

export const { useEditAdminMutation, useChangeAdminPasswordMutation } =
  profileApi;

export default profileApi;
