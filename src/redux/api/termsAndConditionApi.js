import { baseApi } from "./baseApi";

const termsAndConditionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTerms: builder.query({
      query: () => ({
        url: "/terms",
        method: "GET",
      }),
    }),

   
    updateTermsAndCondition: builder.mutation({
      query: (data) => ({
        url: "/terms/create-term",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetTermsQuery,
  useUpdateTermsAndConditionMutation,
} = termsAndConditionApi;

export default termsAndConditionApi;
