import { getUserToken } from "../../services/auth.service";
import { baseApi } from "./baseApi";

const privacyPolicyApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPrivacyPolicy: builder.query({
      query: (data) => ({
        url: `/privacies/`,
        method: "GET",
        body: data,
        headers: {
          Authorization: `Bearer ${getUserToken()}`,
        },
      }),
    }),
    updatePrivacyPolicy: builder.mutation({
      query: (data) => ({
        url: "/privacies/create-privacy",
        method: "POST",
        body: data,
        headers: {
          Authorization: `Bearer ${getUserToken()}`,
        },
      }),
    }),
  }),
});

export const { useGetPrivacyPolicyQuery, useUpdatePrivacyPolicyMutation } =
  privacyPolicyApi;

export default privacyPolicyApi;
