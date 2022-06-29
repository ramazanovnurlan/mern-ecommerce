import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  productList: [],
  product: {},
  isLoading: false,
  error: null,
};

export const getAllProductsAsync = createAsyncThunk(
  "product/getAllProductsAsync",
  async () => {
    return await axios
      .get("http://localhost:5000/products")
      .then((res) => res.data);
  }
);

export const addProductAsync = createAsyncThunk(
  "product/addProductAsync",
  async (data) => {
    return await axios
      .post("http://localhost:5000/products", data)
      .then((res) => res.data);
  }
);

export const getProductAsync = createAsyncThunk(
  "product/getProductAsync",
  async (id) => {
    return await axios
      .get(`http://localhost:5000/products/${id}`)
      .then((res) => res.data);
  }
);

export const editProductAsync = createAsyncThunk(
  "product/editProductAsync",
  async ({ id, changes }) => {
    return await axios
      .patch(`http://localhost:5000/products/${id}`, changes)
      .then((res) => res.data);
  }
);

export const deleteProductAsync = createAsyncThunk(
  "product/deleteProductAsync",
  async (id) => {
    await axios.delete(`http://localhost:5000/products/${id}`);
    return id;
  }
);

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: {
    //get products
    [getAllProductsAsync.pending]: (state) => {
      state.isLoading = true;
    },
    [getAllProductsAsync.fulfilled]: (state, action) => {
      state.productList = action.payload;
      state.isLoading = false;
    },
    [getAllProductsAsync.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    },

    //add product
    // [addProductAsync.pending]: (state, action) => {
    //   state.isLoading = true;
    // },
    [addProductAsync.fulfilled]: (state, action) => {
      state.productList.push(action.payload);
      state.isLoading = false;
    },
    // [addProductAsync.rejected]: (state, action) => {
    //   state.isLoading = false;
    //   state.error = action.error.message;
    // },

    //get product
    [getProductAsync.fulfilled]: (state, action) => {
      state.product = action.payload;
      state.isLoading = false;
    },

    //edit product
    // [editProductAsync.pending]: (state, action) => {
    //   state.isLoading = true;
    // },
    [editProductAsync.fulfilled]: (state, action) => {
      const { id } = action.payload;
      const index = state.productList.findIndex((item) => item.id === id);
      state.productList[index] = action.payload;
      state.isLoading = false;
    },
    // [editProductAsync.rejected]: (state, action) => {
    //   state.isLoading = false;
    //   state.error = action.error.message;
    // },

    //remove product
    [deleteProductAsync.fulfilled]: (state, action) => {
      const id = action.payload;
      //method 1
      state.productList = state.productList.filter((item) => item.id !== id);

      //method 2
      // const index = state.productList.findIndex((item) => item.id === id);
      // state.productList.splice(index, 1);
    },
  },
});

export default productSlice.reducer;
