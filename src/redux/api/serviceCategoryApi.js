import { baseApi } from "./baseApi";

const serviceCategoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllServices: builder.query({
      query: (params) => ({
        url: "/services",
        method: "GET",
        params,
      }),
      providesTags: ["Service"],
    }),
  }),
});

export const { useGetAllServicesQuery } = serviceCategoryApi;

export default serviceCategoryApi;

// createAdmin: builder.mutation({
//   query: (data) => ({
//     url: "/admin/create",
//     method: "POST",
//     body: data,
//   }),
//   invalidatesTags: ["admins"],
// }),
// updateAdmin: builder.mutation({
//   query: ({ _id, status }) => ({
//     url: `/admin/update/${_id}`,
//     method: "PATCH",
//     body: { status },
//   }),
//   invalidatesTags: ["admins"],
// }),
// deleteAdmin: builder.mutation({
//   query: (_id) => ({
//     url: `/admin/delete/${_id}`,
//     method: "DELETE",
//   }),
//   invalidatesTags: ["admins"],
// }),
