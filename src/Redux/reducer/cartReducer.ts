import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { cartReducerinitialState } from "../../Types/reducer_types";
import { Cart } from "../../Types/types";
import toast from "react-hot-toast";


const initialState: cartReducerinitialState = {
  loading: false,
  cartItems: JSON.parse(localStorage.getItem("cart") || "[]"),
  subtotal: 0,
  total: 0,
  shippingCharges: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Cart>) => {
      state.loading = true;

      const index = state.cartItems.findIndex(
        (i) => i.productId === action.payload.productId
      );
      if (index !== -1) {
        state.cartItems[index] = action.payload;
        toast.success('product quantity updated')

      } else {
        state.cartItems.push(action.payload);
      }
      
      localStorage.setItem("cart", JSON.stringify(state.cartItems));
      state.loading = false;
    },
    removeTocartitem: (state, action: PayloadAction<string>) => {
      state.loading = true;
      state.cartItems = state.cartItems.filter((i) => i.productId !== action.payload);
      localStorage.setItem("cart", JSON.stringify(state.cartItems));
      state.loading = false;
    },
  },
});

export const { addToCart, removeTocartitem } = cartSlice.actions;

export default cartSlice.reducer;
