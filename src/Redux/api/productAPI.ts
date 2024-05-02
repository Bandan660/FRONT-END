import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const server = import.meta.env.VITE_SERVER;

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${server}/api/product` }),
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => ({
        url: "all",
        method: "GET",
      }),
    }),
    getProductsDetails: builder.query({
      query: (id) => ({
        url: `${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetProductsQuery, useGetProductsDetailsQuery } = productApi;
