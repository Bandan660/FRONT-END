import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Cart } from "../../types/types";

interface CartState {
    isLoading: boolean;
    error: string | null;
    items: Cart[];
}

const initialState: CartState = {
    isLoading: false,
    error: null,
    items: [],
};

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<Cart>) => {
            state.isLoading = false;
            state.error = null;
            state.items.push(action.payload);
        },
        removeFromCart: (state, action: PayloadAction<number>) => {
            state.isLoading = false;
            state.error = null;
            state.items = state.items.filter((item, index) => index !== action.payload);
        },
        clearCart: (state) => {
            state.isLoading = false;
            state.error = null;
            state.items = [];
        },
    },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
