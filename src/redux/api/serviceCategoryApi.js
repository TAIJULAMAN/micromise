import { baseApi } from "./baseApi";

const serviceCategoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllServices: builder.query({
      query: (params) => ({
        url: "/services",
        method: "GET",
        params,
      }),
      providesTags: ["services"],
    }),
    deleteService: builder.mutation({
      query: (_id) => ({
        url: `/services/${_id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["services"],
    }),
    createService: builder.mutation({
      query: (data) => ({
        url: "/services/create-service",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["services"],
    }),
    updateService: builder.mutation({
      query: ({ _id, data }) => {
        console.log(_id, data);
        return {
          url: `/services/${_id}`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: ["services"],
    }),
  }),
});

export const {
  useGetAllServicesQuery,
  useDeleteServiceMutation,
  useCreateServiceMutation,
  useUpdateServiceMutation,
} = serviceCategoryApi;

export default serviceCategoryApi;
