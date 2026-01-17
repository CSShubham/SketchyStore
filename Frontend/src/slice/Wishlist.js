import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../api";

/* ------------------ THUNKS ------------------ */

// Fetch wishlist
export const fetchWishlist = createAsyncThunk(
  "wishlist/fetch",
  async () => {
    const { data } = await API.get("/wishlist");
    return data.wishlist.items; // ⚠️ ONLY ITEMS ARRAY
  }
);

// Add product to wishlist
export const addToWishlist = createAsyncThunk(
  "wishlist/add",
  async (productId) => {
    const { data } = await API.post("/wishlist/add", { productId });
    return data.wishlist.items;
  }
);

// Remove product from wishlist
export const removeFromWishlist = createAsyncThunk(
  "wishlist/remove",
  async (productId) => {
    const { data } = await API.delete(`/wishlist/remove/${productId}`);
    return data.wishlist.items;
  }
);

/* ------------------ SLICE ------------------ */

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    items: [],       // ✅ always an array
    loading: false,
    error: null,
  },
  reducers: {
    clearWishlist: (state) => {
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    builder
      /* FETCH */
      .addCase(fetchWishlist.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      /* ADD */
      .addCase(addToWishlist.fulfilled, (state, action) => {
        state.items = action.payload;
      })

      /* REMOVE */
      .addCase(removeFromWishlist.fulfilled, (state, action) => {
        state.items = action.payload;
      });
  },
});

export const { clearWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
