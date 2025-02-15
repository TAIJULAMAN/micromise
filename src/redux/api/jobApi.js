import { baseApi } from "./baseApi";

const jobApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllJobs: builder.query({
      query: (params) => ({
        url: "/jobs",
        method: "GET",
        params,
      }),
      providesTags: ["jobs"],
    }),
  }),
});

export const { useGetAllJobsQuery } = jobApi;

export default jobApi;

// deleteService: builder.mutation({
//     query: (_id) => ({
//       url: `/services/${_id}`,
//       method: "DELETE",
//     }),
//     invalidatesTags: ["services"],
//   }),
//   createService: builder.mutation({
//     query: (data) => ({
//       url: "/services/create-service",
//       method: "POST",
//       body: data,
//     }),
//     invalidatesTags: ["services"],
//   }),
//   updateService: builder.mutation({
//     query: ({ _id, data }) => {
//       console.log(_id, data);
//       return {
//         url: `/services/${_id}`,
//         method: "PATCH",
//         body: data,
//       };
//     },
//     invalidatesTags: ["services"],
//   }),
