import { getUserToken } from "../../services/auth.service";
import { baseApi } from "./baseApi";

const adminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllAdmins: builder.query({
      query: (params) => ({
        url: "/users/admins",
        method: "GET",
        headers: {
          Authorization: `Bearer ${getUserToken()}`,
        },
        params,
      }),
      invalidatesTags: ["admin"],
    }),
    createAdmin: builder.mutation({
      query: (data) => ({
        url: "/users/create-admin",
        method: "POST",
        body: data,
        headers: {
          Authorization: `Bearer ${getUserToken()}`,
        },
      }),
      invalidatesTags: ["admin"],
    }),

    deleteAdmin: builder.mutation({
      query: (_id) => ({
        url: `/users/${_id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${getUserToken()}`,
        },
      }),
      invalidatesTags: ["admin"],
    }),
  }),
});

export const {
  useGetAllAdminsQuery,
  useCreateAdminMutation,
  useDeleteAdminMutation,
} = adminApi;

export default adminApi;
