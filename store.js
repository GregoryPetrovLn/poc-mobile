import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./slices/products/productSlice";
import userReducer from "./slices/user/userSlice";

export const store = configureStore({
  reducer: { user: userReducer, product: productReducer },
});
