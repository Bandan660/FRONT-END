import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { decryptCode } from "../../Utils/util";
import { AddressResponse } from "../../Types/api_types"; 
import { Address } from "../../Types/types";

const server = import.meta.env.VITE_SERVER;
const userToken = localStorage.getItem("$#@!%") || "";
const authToken = decryptCode({ token: userToken });

export const addressApi = createApi({
  reducerPath: "addressApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${server}/api/address`,
    prepareHeaders: (headers) => {
      if (authToken) {
        headers.set('Authorization', `Bearer ${authToken}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    createAddress: builder.mutation<AddressResponse, Address>({
      query: (data) => ({
        url: "addAddress",
        method: "POST",
        body: data,
      }),
    }),
    getAddress: builder.query<AddressResponse, string>({
      query: (id) => ({
        url: `getAddressByUserId/${id}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${authToken}`,
        }
      })
    })
  }),
});

export const { useCreateAddressMutation,useGetAddressQuery } = addressApi;
