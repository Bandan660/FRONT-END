import { Address, Product, User } from "./types";

export type MessageResponce = {
  message: string;
  user: User;
  token: string;
};
export type LoginResponce = {
  message: string;
  user: User;
};
export type ProductResponce={
  message: string;
  product: Product[];
 
}
export type AddressResponse={
  message: string;
  address: Address[];
}
