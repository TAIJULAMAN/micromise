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

export const { useGetAllJobsQuery, useUpdateJobMutation } = jobApi;

export default jobApi;

//   createService: builder.mutation({
//     query: (data) => ({
//       url: "/services/create-service",
//       method: "POST",
//       body: data,
//     }),
//     invalidatesTags: ["services"],
//   }),

// /jobs/679871bb6e9478cfe64ae76f