/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const baseURL = import.meta.env.VITE_REACT_APP_BACKEND_URL;

const initialState = {
    wishlists: [],
    responseStatus: "",
    responseMessage: "",
};

export const createWishlist = createAsyncThunk(
    "wishlists/createWishlist",
    async (wishlist, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${baseURL}/storeProductInWishlist`, wishlist);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

export const getWishlists = createAsyncThunk(
    "wishlists/getWishlists",
    async () => {
        try {
            const response = await axios.get(`${baseURL}/fetchWishlistProducts`);
            return response.data;
        } catch (error) {
            return error.response.data.message;
        }
    }
);

export const getWishlistsByUserId = createAsyncThunk(
    "wishlists/getWishlistsByUserId",
    async (wishlistId, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${baseURL}/fetchWishlistProducts/${wishlistId}`);
            return response.data;
        } catch (error) {
            return error.response.data.message;
        }
    }
);

export const deleteWishlist = createAsyncThunk(
    "wishlists/deleteWishlist",
    async (wishlistId, { rejectWithValue }) => {
      try {
        await axios.delete(`${baseURL}/deleteProductFromWishlist/${wishlistId}`);
        return wishlistId;
      } catch (error) {
        return rejectWithValue(error.response.data.message);
      }
    }
  );

const wishlistsSlice = createSlice({
    name: "wishlists",
    initialState,
    reducers: {
        resetWishlistState: (state) => initialState,
    },
    extraReducers: (builder) => {
        // createWishlist reducers
        builder
            .addCase(createWishlist.pending, (state) => {
                state.responseStatus = "pending";
            })
            .addCase(createWishlist.fulfilled, (state) => {
                state.responseStatus = "success";
                state.responseMessage = "Product Added in Wishlist successfully";
            })
            .addCase(createWishlist.rejected, (state, action) => {
                state.responseStatus = "rejected";
                state.responseMessage = action.payload;
            });
  
        // getWishlists reducers
        builder
            .addCase(getWishlists.pending, (state) => {
                state.responseStatus = "pending";
            })
            .addCase(getWishlists.fulfilled, (state, action) => {
                state.wishlists = action.payload;
                state.responseStatus = "success";
            })
            .addCase(getWishlists.rejected, (state, action) => {
                state.responseStatus = "rejected";
                state.responseMessage = action.payload;
            });
  
        // getWishlistsByUserId reducers
        builder
            .addCase(getWishlistsByUserId.pending, (state) => {
                state.responseStatus = "pending";
            })
            .addCase(getWishlistsByUserId.fulfilled, (state, action) => {
                state.wishlists = action.payload;
                state.responseStatus = "success";
            })
            .addCase(getWishlistsByUserId.rejected, (state, action) => {
                state.responseStatus = "rejected";
                state.responseMessage = action.payload;
            });
  
        // deleteWishlist reducers
        builder
            .addCase(deleteWishlist.pending, (state) => {
                state.responseStatus = "pending";
            })
            .addCase(deleteWishlist.fulfilled, (state, action) => {
                state.responseStatus = "success";
                state.responseMessage = "Product deleted successfully";
            })
            .addCase(deleteWishlist.rejected, (state, action) => {
                state.responseStatus = "rejected";
                state.responseMessage = action.payload;
            });
    },
  });
  
export const { resetWishlistState } = wishlistsSlice.actions;
export default wishlistsSlice.reducer;
