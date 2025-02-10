import { baseApi } from "./baseApi";

const invoiceApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllInvoices: builder.query({
      query: (params) => ({
        url: "/invoices",
        method: "GET",
        params,
      }),
      providesTags: ["invoices"],
    }),
  }),
});

export const { useGetAllInvoicesQuery } = invoiceApi;

export default invoiceApi;

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
