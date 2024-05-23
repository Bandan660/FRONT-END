import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { MessageResponce } from "../../Types/api_types";
import { User, UserLogin } from "../../Types/types";
import { decryptCode } from "../../Utils/util";

const server = import.meta.env.VITE_SERVER;
const usertoken = localStorage.getItem("$#@!%") || "";
const AuthToken = decryptCode({ token: usertoken });
console.log(AuthToken);

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

    userdetails: builder.query({
      query: (id) => {
        return {
          url: `userdetails/${id}`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${AuthToken}`,
          },
        };
      },
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation, useUserdetailsQuery } =
  userApi;
