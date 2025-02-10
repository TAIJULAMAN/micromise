import { getUserToken } from "../../services/auth.service";
import { baseApi } from "./baseApi";

const getMeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMe: builder.query({
      query: () => ({
        url: "/users/me",
        method: "GET",
        headers: {
          Authorization: `Bearer ${getUserToken()}`,
        },
      }),
    }),
  }),
});

export const { useGetMeQuery } = getMeApi;

export default getMeApi;
