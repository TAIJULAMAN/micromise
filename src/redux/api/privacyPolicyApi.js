// import { getUserToken } from "../../services/auth.service";
import { baseApi } from "./baseApi";

const privacyPolicyApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPrivacyPolicy: builder.query({
      query: ({ _id }) => ({
        url: `/privacies/${_id}`,
        method: "GET",
      }),
    }),
    addPrivacyPolicy: builder.mutation({
      query: (data) => ({
        url: "/privacies/create-privacy",
        method: "POST",
        body: data,
        // headers: {
        //   Authorization: `Bearer ${getUserToken()}`,
        // },
      }),
    }),
  }),
});

export const { useGetPrivacyPolicyQuery, useAddPrivacyPolicyMutation } =
  privacyPolicyApi;

export default privacyPolicyApi;
