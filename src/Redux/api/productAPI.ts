import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ProductResponce } from "../../Types/api_types";
import { decryptCode } from "../../Utils/util";

const server = import.meta.env.VITE_SERVER;
const usertoken = localStorage.getItem("$#@!%") || "";
const AuthToken = decryptCode({ token: usertoken });
console.log(AuthToken);

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
    addProduct: builder.mutation({
      query: (data) => ({
        url: "create",
        method: "POST",
        body: data,
        headers: {
          Authorization: `Bearer ${AuthToken}`,
        },
      }),
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductsDetailsQuery,
  useAddProductMutation,
} = productApi;
