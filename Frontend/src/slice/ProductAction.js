import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../api";

// ==============================
// FETCH ALL PRODUCTS (PAGINATED)
// ==============================
export const fetchAllProducts = createAsyncThunk(
  "products/fetchAll",
  async ({ page = 1, limit = 10 }, thunkAPI) => {
    try {
      // console.log("Fetching products for page:", page, "with limit:", limit);
      const { data } = await API.get(
        `/products?page=${page}&limit=${limit}`
      );
      return data; // return FULL response
      console.log(data);
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to fetch products"
      );
    }
  }
);

// ==============================
// FETCH PRODUCTS BY CATEGORY
// ==============================
export const fetchProductsByCategory = createAsyncThunk(
  "products/fetchByCategory",
  async ({ category, page = 1, limit = 10 }, thunkAPI) => {
    try {
      const { data } = await API.get(
        `/products/category/${category}?page=${page}&limit=${limit}`
      );
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to fetch category products"
      );
    }
  }
);

// ==============================
// FETCH CATEGORIES
// ==============================
export const fetchCategories = createAsyncThunk(
  "products/fetchCategories",
  async (_, thunkAPI) => {
    try {
      const { data } = await API.get("/products/categories");
      return data.categories;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to fetch categories"
      );
    }
  }
);
