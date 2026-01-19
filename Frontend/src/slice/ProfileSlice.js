import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getProfile } from "../services/profileAPIs";

export const loadProfile = createAsyncThunk(
  "profile/load",
  async () => {
    const { data } = await getProfile();
    return data.user;
  }
);

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    user: null,
    loading: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loadProfile.rejected, (state) => {
  state.loading = false;
  // optionally set an error state
});
  },
});

export default profileSlice.reducer;
