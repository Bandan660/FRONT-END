import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { MessageResponce } from "../../types/api_types";
import { User, UserLogin } from "../../types/types";

const server = import.meta.env.VITE_SERVER;

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${server}/api/user` }),
  endpoints: (builder) => ({
    register: builder.mutation<MessageResponce, User>({
      query: (user) => ({
        url: "register",
        method: "POST",
        body: user,
      }),
    }),
    updateuser: builder.mutation<MessageResponce, User>({
      query: (user) => ({
        url: `updateuser/${user._id}`,
        method: "PUT",
        body: user,
      }),
    }),
    login: builder.mutation<MessageResponce, UserLogin>({
      query: (user) => ({
        url: "login",
        method: "POST",
        body: user,
      }),
    }),

    userdetails: builder.query<MessageResponce, string>({
      query: (id) => {
        return {
          url: `userdetails/${id}`,
          method: "GET",
        };
      },
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation, useUserdetailsQuery } =
  userApi;
