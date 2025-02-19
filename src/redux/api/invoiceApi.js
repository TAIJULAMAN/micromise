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
    createInvoice: builder.mutation({
      query: (data) => ({
        url: "invoices/create-invoice",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["invoices"],
    }),
    updateInvoice: builder.mutation({
      query: ({ _id, data }) => {
        console.log(_id, data);
        return {
          url: `/services/${_id}`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: ["invoices"],
    }),
  }),
});

export const { useGetAllInvoicesQuery, useDeleteInvoiceMutation, useCreateInvoiceMutation, } = invoiceApi;

export default invoiceApi;


