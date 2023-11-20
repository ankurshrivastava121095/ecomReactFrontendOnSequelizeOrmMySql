/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const baseURL = import.meta.env.VITE_REACT_APP_BACKEND_URL;

const initialState = {
  orders: [],
  responseStatus: "",
  responseMessage: "",
};

export const createOrder = createAsyncThunk(
  "orders/createOrder",
  async (order, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${baseURL}/orderPlaced`, order);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const getOrders = createAsyncThunk(
  "orders/getOrders",
  async () => {
    try {
      const response = await axios.get(`${baseURL}/fetchOrders`);
      return response.data;
    } catch (error) {
      return error.response.data.message;
    }
  }
);

export const getOrdersByUserId = createAsyncThunk(
  "orders/getOrdersByUserId",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${baseURL}/fetchOrders/${userId}`);
      return response.data;
    } catch (error) {
      return error.response.data.message;
    }
  }
);

export const getOrder = createAsyncThunk(
  "orders/getOrder",
  async (orderId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${baseURL}/fetchOrder/${orderId}`
      );
      return response.data;
    } catch (error) {
      return error.response.data.message;
    }
  }
);

export const updateOrder = createAsyncThunk(
  "orders/updateOrder",
  async (order, { rejectWithValue }) => {
    try {
        const response = await axios.put(`${baseURL}/updateOrder/${order.id}`, order);
        return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const deleteOrder = createAsyncThunk(
  "orders/deleteOrder",
  async (orderId, { rejectWithValue }) => {
    try {
      await axios.delete(`${baseURL}/deleteOrder/${orderId}`);
      return orderId;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const ordersSlice = createSlice({
    name: "orders",
    initialState,
    reducers: {
      resetOrderState: (state) => initialState,
    },
    extraReducers: (builder) => {
      // createOrder reducers
      builder
        .addCase(createOrder.pending, (state) => {
          state.responseStatus = "pending";
        })
        .addCase(createOrder.fulfilled, (state) => {
          state.responseStatus = "success";
          state.responseMessage = "Order Placed successfully";
        })
        .addCase(createOrder.rejected, (state, action) => {
          state.responseStatus = "rejected";
          state.responseMessage = action.payload;
        });
  
      // getOrders reducers
      builder
        .addCase(getOrders.pending, (state) => {
          state.responseStatus = "pending";
        })
        .addCase(getOrders.fulfilled, (state, action) => {
          state.orders = action.payload;
          state.responseStatus = "success";
        })
        .addCase(getOrders.rejected, (state, action) => {
          state.responseStatus = "rejected";
          state.responseMessage = action.payload;
        });
  
      // getOrdersByUserId reducers
      builder
        .addCase(getOrdersByUserId.pending, (state) => {
          state.responseStatus = "pending";
        })
        .addCase(getOrdersByUserId.fulfilled, (state, action) => {
          state.orders = action.payload;
          state.responseStatus = "success";
        })
        .addCase(getOrdersByUserId.rejected, (state, action) => {
          state.responseStatus = "rejected";
          state.responseMessage = action.payload;
        });
  
      // getOrder reducers
      builder
        .addCase(getOrder.pending, (state) => {
          state.responseStatus = "pending";
        })
        .addCase(getOrder.fulfilled, (state, action) => {
          state.orders = action.payload;
          state.responseStatus = "success";
        })
        .addCase(getOrder.rejected, (state, action) => {
          state.responseStatus = "rejected";
          state.responseMessage = action.payload;
        });
  
      // deleteOrder reducers
      builder
        .addCase(deleteOrder.pending, (state) => {
          state.responseStatus = "pending";
        })
        .addCase(deleteOrder.fulfilled, (state, action) => {
          state.responseStatus = "success";
          state.responseMessage = "Order deleted successfully";
        })
        .addCase(deleteOrder.rejected, (state, action) => {
          state.responseStatus = "rejected";
          state.responseMessage = action.payload;
        });
  
      // updateOrder reducers
      builder
        .addCase(updateOrder.pending, (state) => {
          state.responseStatus = "pending";
        })
        .addCase(updateOrder.fulfilled, (state, action) => {
          if (Array.isArray(state.orders)) {
            state.orders = state.orders.map((order) =>
              order.id === action.payload.id ? action.payload : order
            );
          } else {
            state.orders = action.payload;
          }
          state.responseStatus = "success";
          state.responseMessage = "Order updated successfully";
        })
        .addCase(updateOrder.rejected, (state, action) => {
          state.responseStatus = "rejected";
          state.responseMessage = action.payload;
        });
    },
  });
  
export const { resetOrderState } = ordersSlice.actions;
export default ordersSlice.reducer;
