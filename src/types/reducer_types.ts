import { User,Cart } from "./types";

export interface LoginState {
  isLoading: boolean;
  error: string | null;
  user: User | null;
}

export interface cartReducerinitialState{
  loading:boolean;
  cartItems:Cart[],
  subtotal:number,
  total:number,
  shippingCharges:number
  
}
