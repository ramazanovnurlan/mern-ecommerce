import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./product/productSlice";
import cartSlice from "./cart/cartSlice";
import favoritesSlice from "./favorites/favoritesSlice";
import authSlice from "../features/auth/authSlice";

export const store = configureStore({
  reducer: {
    products: productSlice,
    cart: cartSlice,
    favorites: favoritesSlice,
    auth: authSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
