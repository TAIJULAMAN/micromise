import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getBaseUrl } from "../../config/envConfig";
import { getUserToken } from "../../services/auth.service";

// Helper function to get the auth token
export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: getBaseUrl(),

    prepareHeaders: (headers, { getState }) => {
        // console.log(getState);
      const token = getUserToken();
      if (token) {
        headers.set("Authorization", token);
      }

      return headers;
    },
  }),
  endpoints: () => ({}),
  tagTypes: [
    "admin",
  ],
});

