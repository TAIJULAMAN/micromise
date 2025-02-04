import { baseApi } from "./baseApi";

const privacyPolicyApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPrivacy: builder.query({
      query: () => ({
        url: "/privacies",
        method: "GET",
      }),
    }),

    updatePrivacy: builder.mutation({
      query: (data) => ({
        url: "/privacies/create-privacy",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useGetPrivacyQuery, useUpdatePrivacyMutation } =
  privacyPolicyApi;

export default privacyPolicyApi;
