import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "../slice/ProductSlice";
import cartReducer from "../slice/CartSlice";
import WishlistReducer from "../slice/Wishlist";
import orderReducer from "../slice/OrderSlice";
import authReducer from "../slice/AuthSlice";
import profileReducer from "../slice/ProfileSlice";
export const store = configureStore({
  reducer: { products: productsReducer, cart: cartReducer ,  wishlist: WishlistReducer, order: orderReducer , auth : authReducer, profile: profileReducer},
});
