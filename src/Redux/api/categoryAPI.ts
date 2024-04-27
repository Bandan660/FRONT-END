import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const server = import.meta.env.VITE_SERVER;

export const categoryApi = createApi({
  reducerPath: "categoryApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${server}/api/category` }),
  endpoints: (builder) => ({
    getcategory: builder.query({
      query: () => ({
        url: "allcategory",
        method: "GET",
      }),
    }),
  }),
});
