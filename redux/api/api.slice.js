import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/data`
  }),
  tagTypes: [],
  endpoints: (builder) => ({}),
  refetchOnReconnect: true
});
