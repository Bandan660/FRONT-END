import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { decryptCode } from "../../Utils/util";


const server = import.meta.env.VITE_SERVER;
const usertoken = localStorage.getItem("$#@!%") || "";
const AuthToken = decryptCode({ token: usertoken });

export const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${server}/api/order` }),

  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (data) => ({
        url: "createOrder",
        method: "POST",
        body: data,
        headers: {
            Authorization: `Bearer ${AuthToken}`,

        }
      }),
    }),
    verifyPayment:builder.mutation({
      query: (data) => ({
        url: "verifyPayment",
        method: "POST",
        body: data,
        headers: {
          Authorization: `Bearer ${AuthToken}`,
        }
      })
    })
  }),
});

export const {useCreateOrderMutation,useVerifyPaymentMutation}=orderApi
