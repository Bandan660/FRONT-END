import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { cartReducerinitialState } from "../../types/reducer_types";
import { Cart } from "../../types/types";

const initialState: cartReducerinitialState = {
  loading: false,
  cartItems: [],
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
      } else {
        state.cartItems.push(action.payload);
      }

      state.loading = false;
    },
    removeTocartitem: (state, action: PayloadAction<string>) => {
      state.loading = true;
      state.cartItems.filter((i) => i.productId !== action.payload);
      state.loading = false;
    },
  },
});

export const { addToCart, removeTocartitem } = cartSlice.actions;

export default cartSlice.reducer;
