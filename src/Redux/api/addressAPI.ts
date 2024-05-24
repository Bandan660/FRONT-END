import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { decryptCode } from "../../Utils/util";
import { AddressResponse } from "../../Types/api_types";
import { Address, AddressFormValues } from "../../Types/types";

const server = import.meta.env.VITE_SERVER;
const userToken = localStorage.getItem("$#@!%") || "";
const authToken = decryptCode({ token: userToken });

export const addressApi = createApi({
  reducerPath: "addressApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${server}/api/address`,
    prepareHeaders: (headers) => {
      if (authToken) {
        headers.set("Authorization", `Bearer ${authToken}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    createAddress: builder.mutation<AddressResponse, AddressFormValues>({
      query: (data) => ({
        url: "addAddress",
        method: "POST",
        body: data,
      }),
    }),

    editAddress: builder.mutation<
      Address,
      { data: AddressFormValues; id: string }
    >({
      query: ({ data, id }) => ({
        url: `editAddress/${id}`,
        method: "PUT",
        body: data,
      }),
    }),

    getAddress: builder.query<AddressResponse, string>({
      query: (id) => ({
        url: `getAddressByUserId/${id}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }),
    }),
    getAddressByid: builder.query<AddressResponse, Address>({
      query: (id) => ({
        url: `${id}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }),
    }),

    deleteAddress: builder.mutation<Address, { id: string }>({
      query: ({ id }) => ({
        url: `deleteAddress/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }),
    }),
  }),
});

export const {
  useCreateAddressMutation,
  useGetAddressQuery,
  useGetAddressByidQuery,
  useEditAddressMutation,
  useDeleteAddressMutation,
} = addressApi;
