import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./appSlice";
import productReducer from "./productSlice";
import modalReducer from "./modalSlice";
import cartReducer from "./cartSlice";

const store = configureStore({
  reducer: {
    app: appReducer,
    product: productReducer,
    modal: modalReducer,
    cart: cartReducer,
  },
});

export default store;
