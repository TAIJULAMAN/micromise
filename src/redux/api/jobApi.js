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
    getAllRaisedJobs: builder.query({
      query: (params) => ({
        url: "jobs?status=raised",
        method: "GET",
        params,
      }),
      providesTags: ["jobs"],
    }),
    updateJob: builder.mutation({
      query: ({ _id, data }) => {
        // console.log(_id, data);
        // console.log(data,"data")
        return {
          url: `/jobs/${_id}`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: ["jobs"],
    }),
  }),
});

export const {
  useGetAllJobsQuery,
  useUpdateJobMutation,
  useGetAllRaisedJobsQuery,
} = jobApi;

export default jobApi;
