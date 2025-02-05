import { baseApi } from "./baseApi";

const clientApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllClient: builder.query({
      query: (params) => ({
        url: "/users/clients",
        method: "GET",
        params,
      }),
      providesTags: ["client"],
    }),
    deleteClient: builder.mutation({
      query: (_id) => ({
        url: `/users/${_id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["client"],
    }),
  }),
});

export const { useGetAllClientQuery, useDeleteClientMutation } = clientApi;

export default clientApi;
