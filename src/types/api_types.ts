import { User, UserLogin } from "./types";

export type MessageResponce = {
  message: string;
  user: User;
  token: string;
};
export type LoginResponce = {
  message: string;
  user: UserLogin;
  token: string;
};
