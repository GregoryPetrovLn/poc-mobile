import { createSlice } from "@reduxjs/toolkit";
import {
  getListProducts,
  getProductById,
  setSelectedProductId,
} from "./actions";

const initialState = {
  list: null,
  count: 0,
  selected: null,
  selectedId: null,
  loading: false,
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getListProducts.fulfilled, (state, { payload }) => {
        state.list = payload.data;
        state.count = payload.count;
        state.loading = false;
      })
      .addCase(getListProducts.rejected, (state) => {
        state.list = null;
        state.count = 0;
      })
      .addCase(getListProducts.pending, (state) => {
        state.loading = true;
      });
    builder.addCase(getProductById.fulfilled, (state, { payload }) => {
      state.selected = payload;
      state.loading = false;
    });
    builder.addCase(setSelectedProductId, (state, { payload }) => {
      state.selectedId = payload;
    });
  },
});
export const selectProduct = (state) => state.product;

export default productSlice.reducer;
