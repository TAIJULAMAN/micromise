import { getUserToken } from "../../services/auth.service";
import { baseApi } from "./baseApi";

const UserApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    ownData: builder.query({
      query: () => ({
        url: "/users/me",
        method: "GET",
        headers: {
          Authorization: `Bearer ${getUserToken()}`,
        },
      }),
    }),
    updateAdmin: builder.mutation({
      query: ({ _id, file }) => {
        return {
          url: `/users/${_id}`,
          method: "PATCH",
          body: file,
        };
      },
      invalidatesTags: ["own"],
    }),
  }),
});

export const { useOwnDataQuery, useUpdateAdminMutation } = UserApi;

export default UserApi;
