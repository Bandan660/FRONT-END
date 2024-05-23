import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { decryptCode } from "../../Utils/util";

const server = import.meta.env.VITE_SERVER;
const usertoken = localStorage.getItem("$#@!%") || "";
const AuthToken = decryptCode({ token: usertoken });
console.log(AuthToken);

export const cartApi = createApi({
  reducerPath: "cartApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${server}/api/cart` }),
  endpoints: (builder) => ({
    addtocart: builder.mutation({
      query: (data) => ({
        url: "add-to-cart",
        method: "POST",
        headers: {
          Authorization: `Bearer ${AuthToken}`,
        },
        body: data,
      }),
    }),
    cartItems: builder.query({
      query: () => ({
        url: "get-cart-details",
        method: "GET",
        headers: {
          Authorization: `Bearer ${AuthToken}`,
        },
      }),
    }),
  }),
});

export const { useAddtocartMutation, useCartItemsQuery } = cartApi;
