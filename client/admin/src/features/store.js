import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./product/productSlice";
import authSlice from "../features/auth/authSlice";

export const store = configureStore({
  reducer: {
    products: productSlice,
    auth: authSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
