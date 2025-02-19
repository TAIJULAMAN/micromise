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
    deleteInvoice: builder.mutation({
      query: (_id) => ({
        url: `/invoices/${_id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["invoices"],
    }),
  }),
});

export const { useGetAllInvoicesQuery, useDeleteInvoiceMutation } = invoiceApi;

export default invoiceApi;

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
