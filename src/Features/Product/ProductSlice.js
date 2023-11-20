/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const baseURL = import.meta.env.VITE_REACT_APP_BACKEND_URL;

const initialState = {
  products: [],
  responseStatus: "",
  responseMessage: "",
};

export const createProduct = createAsyncThunk(
  "products/createProduct",
  async (product, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${baseURL}/storeProduct`, product);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const getProducts = createAsyncThunk(
  "products/getProducts",
  async () => {
    try {
      const response = await axios.get(`${baseURL}/fetchProducts`);
      return response.data;
    } catch (error) {
      return error.response.data.message;
    }
  }
);

export const getProductsCategoryWise = createAsyncThunk(
  "products/getProductsCategoryWise",
  async (categoryId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${baseURL}/fetchProductsCategoryWise/${categoryId}`);
      return response.data;
    } catch (error) {
      return error.response.data.message;
    }
  }
);

export const getProduct = createAsyncThunk(
  "products/getProduct",
  async (productId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${baseURL}/fetchProduct/${productId}`
      );
      return response.data;
    } catch (error) {
      return error.response.data.message;
    }
  }
);

export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async (product, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("productName", product.get('productName'));
      formData.append("productDescription", product.get('productDescription'));
      formData.append("productCategory", product.get('productCategory'));
      formData.append("productPrice", product.get('productPrice'));
      formData.append("productQuantity", product.get('productQuantity'));
      formData.append("productImage", product.get('productImage'));

      const response = await axios.put(
        `${baseURL}/updateProduct/${product.get('id')}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (productId, { rejectWithValue }) => {
    try {
      await axios.delete(`${baseURL}/deleteProduct/${productId}`);
      return productId;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        resetProductState: (state) => initialState,
    },
    extraReducers: (builder) => {
        // create reducers
        builder
        .addCase(createProduct.pending, (state) => {
            state.responseStatus = "pending";
        })
        .addCase(createProduct.fulfilled, (state) => {
            state.responseStatus = "success";
            state.responseMessage = "Product created successfully";
        })
        .addCase(createProduct.rejected, (state, action) => {
            state.responseStatus = "rejected";
            state.responseMessage = action.payload;
        });

        // get all reducers
        builder
        .addCase(getProducts.pending, (state) => {
            state.responseStatus = "pending";
        })
        .addCase(getProducts.fulfilled, (state, action) => {
            state.products = action.payload;
            state.responseStatus = "success";
        })
        .addCase(getProducts.rejected, (state, action) => {
            state.responseStatus = "rejected";
            state.responseMessage = action.payload;
        });

        // get all reducers category wise
        builder
        .addCase(getProductsCategoryWise.pending, (state) => {
            state.responseStatus = "pending";
        })
        .addCase(getProductsCategoryWise.fulfilled, (state, action) => {
            state.products = action.payload;
            state.responseStatus = "success";
        })
        .addCase(getProductsCategoryWise.rejected, (state, action) => {
            state.responseStatus = "rejected";
            state.responseMessage = action.payload;
        });

        // get reducers
        builder
        .addCase(getProduct.pending, (state) => {
            state.responseStatus = "pending";
        })
        .addCase(getProduct.fulfilled, (state, action) => {
            state.products = action.payload;
            state.responseStatus = "success";
        })
        .addCase(getProduct.rejected, (state, action) => {
            state.responseStatus = "rejected";
            state.responseMessage = action.payload;
        });

        // delete reducers
        builder
        .addCase(deleteProduct.pending, (state) => {
            state.responseStatus = "pending";
        })
        .addCase(deleteProduct.fulfilled, (state, action) => {
            state.responseStatus = "success";
            state.responseMessage = "Product deleted successfully";
        })
        .addCase(deleteProduct.rejected, (state, action) => {
            state.responseStatus = "rejected";
            state.responseMessage = action.payload;
        });

        // update reducers
        builder
        .addCase(updateProduct.pending, (state) => {
            state.responseStatus = "pending";
        })
        .addCase(updateProduct.fulfilled, (state, action) => {
            if (Array.isArray(state.products)) {
            state.products = state.products.map((product) =>
                product.id === action.payload.id ? action.payload : product
            );
            } else {
            state.products = action.payload;
            }
            state.responseStatus = "success";
            state.responseMessage = "Product updated successfully";
        })
        .addCase(updateProduct.rejected, (state, action) => {
            state.responseStatus = "rejected";
            state.responseMessage = action.payload;
        });
    },
});

export const { resetProductState } = productsSlice.actions;
export default productsSlice.reducer;
