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
    }),

    deleteAdmin: builder.mutation({
      query: (_id) => ({
        url: `/users/${_id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${getUserToken()}`,
        },
      }),
    }),
  }),
});

export const {
  useGetAllAdminsQuery,
  useCreateAdminMutation,
  useDeleteAdminMutation,
} = adminApi;

export default adminApi;
