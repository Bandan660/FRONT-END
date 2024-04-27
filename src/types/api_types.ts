import { User } from "./types";

export type MessageResponce = {
  message: string;
  user: User;
  token: string;
};
export type LoginResponce = {
  message: string;
  user: User;
};
