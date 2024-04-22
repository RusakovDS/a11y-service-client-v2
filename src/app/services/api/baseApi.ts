import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";
import { logout, updateToken } from "../../slices/authSlice";
import { RootState } from "../../store";

const API_URL = "http://localhost:5000";

const baseQuery = fetchBaseQuery({
  baseUrl: API_URL,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 401) {
    // send refresh token to get new access token
    const refreshResult = await baseQuery(
      { url: "/auth/refresh", method: "POST" },
      api,
      extraOptions
    );

    if (refreshResult?.data) {
      // store the new token
      api.dispatch(updateToken(refreshResult?.data?.accessToken));
      // retry the original query with new access token
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logout());
    }
  }

  return result;
};

const baseQueryWithReauthAndRetry = retry(baseQueryWithReauth, {
  maxRetries: 5,
});

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauthAndRetry,
  tagTypes: ['Project'],
  endpoints: () => ({}),
});
