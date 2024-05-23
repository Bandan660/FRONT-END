import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ProductResponce } from "../../Types/api_types";

const server = import.meta.env.VITE_SERVER;

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${server}/api/product` }),
  endpoints: (builder) => ({
    getProducts: builder.query<ProductResponce, string>({
      query: (page = 1, limit = 10) => ({
        url: `all?page=${page}&limit=${limit}`,
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
