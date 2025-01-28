import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getBaseUrl } from "../../config/envConfig";

// Helper function to get the auth token
const getAuthToken = () => {
  const token = localStorage.getItem("accessToken");
  return token ? `Bearer ${token}` : "";
};

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: getBaseUrl(),

    prepareHeaders: (headers, { getState }) => {
        console.log(getState);
      const token = getAuthToken();
      if (token) {
        headers.set("Authorization", token);
      }

      return headers;
    },
  }),
  endpoints: () => ({}),
  tagTypes: [
    
  ],
});
