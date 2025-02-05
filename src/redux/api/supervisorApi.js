import { baseApi } from "./baseApi";

const supervisorApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllSupervisor: builder.query({
      query: (params) => ({
        url: "/users/supervisors",
        method: "GET",
        params,
      }),
      providesTags: ["supervisor"],
    }),
    deleteSupervisor: builder.mutation({
      query: (_id) => ({
        url: `/users/${_id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["supervisor"],
    }),
  }),
});

export const { useGetAllSupervisorQuery, useDeleteSupervisorMutation } =
  supervisorApi;

export default supervisorApi;
