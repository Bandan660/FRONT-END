import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import { userApi } from "./api/userAPI";
import { categoryApi } from "./api/categoryAPI";
import { productApi } from "./api/productAPI";
import userReducer from "./reducer/userReducer";
import { cartApi } from "./api/cartAPI";
import { cartSlice } from "./reducer/cartReducer";


const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartSlice.reducer,
    // Add reducers here if you have any other reducers in your app
    [userApi.reducerPath]: userApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [cartApi.reducerPath]: cartApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      userApi.middleware,
      categoryApi.middleware,
      productApi.middleware,
      cartApi.middleware
    ),
});

// Add setupListeners after the store has been created
// setupListeners(store);

export default store;
