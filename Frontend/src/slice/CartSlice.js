import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../api";

/* ------------------ THUNKS ------------------ */

export const fetchCart = createAsyncThunk(
  "cart/fetch",
  async () => {
    const { data } = await API.get("/cart");
    // console.log("cart data that is fetched:",data.cart);
    return data.cart;
    
  } 
);

export const addToCart = createAsyncThunk(
  "cart/add",
  async (item) => {
    // console.log(item);
    const { data } = await API.post("/cart/add", item);
    return data.cart;
  }
);

export const updateCart = createAsyncThunk(
  "cart/update",
  async ({ productId, quantity }) => {
    const { data } = await API.put("/cart/update", {
      productId,
      quantity,
    });
    return data.cart;
  }
);

export const removeFromCart = createAsyncThunk(
  "cart/remove",
  async (productId) => {
    const { data } = await API.delete(`/cart/remove/${productId}`);
    return data.cart;
  }
);

/* ------------------ SLICE ------------------ */

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    loading: false,
  },
  reducers: {
    clearCart: (state) => {
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.items = action.payload.items ;
        console.log("cart items in slice:", state.items);
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.items = action.payload.items ;
      })
      .addCase(updateCart.fulfilled, (state, action) => {
        state.items = action.payload.items ;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.items = action.payload.items ;
      });
  },
});

export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;
