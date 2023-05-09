import { createAction, createAsyncThunk } from "@reduxjs/toolkit";

export const getListProducts = createAsyncThunk(
  "product/getListProducts",
  async () => {
    try {
      const res = await fetch(`${process.env.API_BASE_URL}/products`);
      const { data, count } = await res.json();
      return { data, count };
    } catch (error) {
      console.log(error);
    }
  }
);
export const getProductById = createAsyncThunk(
  "product/getProductById",
  async (id) => {
    try {
      const res = await fetch(`${process.env.API_BASE_URL}/products/${id}`);
      const { data } = await res.json();
      console.log("recieved data", data);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);
export const setSelectedProductId = createAction(
  "product/setSelectedProductId"
);
