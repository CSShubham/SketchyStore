import { createSlice } from "@reduxjs/toolkit";
import {
  fetchAllProducts,
  fetchProductsByCategory,
  fetchCategories,
} from "./ProductAction";

const productSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    categoryItems: [],
    categories: [],
    pagination: {
      currentPage: 1,
      totalPages: 1,
      totalItems: 0,
    },
    loading: {
      products: false,
      categories: false,
    },
    error: null,
  },
  reducers: {
    clearProductError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // ========================
      // FETCH ALL PRODUCTS
      // ========================
      .addCase(fetchAllProducts.pending, (state) => {
        state.loading.products = true;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.loading.products = false;
        state.items = action.payload.products;
        state.pagination = {
          currentPage: action.payload.currentPage,
          totalPages: action.payload.totalPages,
          totalItems: action.payload.totalItems,
        };
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.loading.products = false;
        state.error = action.payload;
      })

      // ========================
      // FETCH BY CATEGORY
      // ========================
      .addCase(fetchProductsByCategory.pending, (state) => {
        state.loading.products = true;
      })
      .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
        state.loading.products = false;
        state.categoryItems = action.payload.products;
        state.pagination = {
          currentPage: action.payload.currentPage,
          totalPages: action.payload.totalPages,
          totalItems: action.payload.totalItems,
        };
      })
      .addCase(fetchProductsByCategory.rejected, (state, action) => {
        state.loading.products = false;
        state.error = action.payload;
      })

      // ========================
      // FETCH CATEGORIES
      // ========================
      .addCase(fetchCategories.pending, (state) => {
        state.loading.categories = true;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading.categories = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading.categories = false;
        state.error = action.payload;
      });
  },
});

export const { clearProductError } = productSlice.actions;
export default productSlice.reducer;
