import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../api";

/* ------------------ THUNKS ------------------ */

export const fetchCart = createAsyncThunk(
  "cart/fetch",
  async () => {
    const { data } = await API.get("/cart");
    return data.cart;
  }
);

export const addToCart = createAsyncThunk(
  "cart/add",
  async (item) => {
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
        state.items = action.payload;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(updateCart.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.items = action.payload;
      });
  },
});

export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;
