import { getUserToken } from "../../services/auth.service";
import { baseApi } from "./baseApi";

const UserApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    ownData: builder.query({
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

export const { useOwnDataQuery } = UserApi;

export default UserApi;
