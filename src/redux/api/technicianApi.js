import { baseApi } from "./baseApi";

const technicianApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllTechnician: builder.query({
      query: (params) => ({
        url: "/users/technicians",
        method: "GET",
        params,
      }),
      providesTags: ["technician"],
    }),
    deleteTechnician: builder.mutation({
      query: (_id) => ({
        url: `/users/${_id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["technician"],
    }),
  }),
});

export const { useGetAllTechnicianQuery, useDeleteTechnicianMutation } =
  technicianApi;

export default technicianApi;
