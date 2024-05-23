import { configureStore } from "@reduxjs/toolkit";
import { userApi } from "./api/userAPI";
import { categoryApi } from "./api/categoryAPI";
import { productApi } from "./api/productAPI";
import userReducer from "./reducer/userReducer";
import { cartApi } from "./api/cartAPI";
import cartReducer from "./reducer/cartReducer";
import { addressApi } from "./api/addressAPI";

const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
    // Add reducers here if you have any other reducers in your app
    [userApi.reducerPath]: userApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [cartApi.reducerPath]: cartApi.reducer,
    [addressApi.reducerPath]: addressApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      userApi.middleware,
      categoryApi.middleware,
      productApi.middleware,
      cartApi.middleware,
      addressApi.middleware
    ),
});

// Add setupListeners after the store has been created
// setupListeners(store);

export default store;
export type RootState = ReturnType<typeof store.getState>;
