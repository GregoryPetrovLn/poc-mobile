import { createSlice } from "@reduxjs/toolkit";
import { authFunction, logoutFunction, setUser } from "./actions";

const initialState = {
  user: null,
  loading: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(authFunction.fulfilled, (state, { payload }) => {
        console.log("payload", payload);
        state.user = payload;
        state.loading = false;
      })
      .addCase(authFunction.pending, (state) => {
        state.loading = true;
      })
      .addCase(authFunction.rejected, (state, {}) => {
        state.loading = false;
        state.user = null;
      })
      .addCase(logoutFunction.fulfilled, (state) => {
        state.user = null;
      })
      .addCase(setUser, (state, { payload }) => {
        state.user = payload;
      });
  },
});
export const selectUser = (state) => state.user;

export default userSlice.reducer;
