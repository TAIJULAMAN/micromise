/* eslint-disable no-unused-vars */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getBaseUrl } from "../../config/envConfig";
import { getUserToken } from "../../services/auth.service";

// Helper function to get the auth token
export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: getBaseUrl(),
    "ngrok-skip-browser-warning": "1",

    prepareHeaders: (headers, { getState }) => {
      // console.log(getState);
      const token = getState().auth.token;
      console.log(token);
      // const token = getUserToken();
      if (token) {
        headers.set("Authorization", token);
      }
      headers.set("ngrok-skip-browser-warning", "1");
      return headers;
    },
  }),
  endpoints: () => ({}),
  tagTypes: [
    "admin",
    "services",
    "technician",
    "supervisor",
    "client",
    "dashboard",
    "notification",
    "Profile",
    "jobs",
    "tickets",
    "invoices",
    "own",
  ],
});
