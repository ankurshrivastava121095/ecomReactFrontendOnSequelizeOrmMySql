/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const baseURL = import.meta.env.VITE_REACT_APP_BACKEND_URL;

const initialState = {
  categories: [],
  responseStatus: "",
  responseMessage: "",
};

export const createCategory = createAsyncThunk(
  "categories/createCategory",
  async (category, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${baseURL}/storeCategory`, category);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const getCategories = createAsyncThunk(
  "categories/getCategories",
  async () => {
    try {
      const response = await axios.get(`${baseURL}/fetchCategories`);
      return response.data;
    } catch (error) {
      return error.response.data.message;
    }
  }
);

export const getCategory = createAsyncThunk(
  "categories/getCategory",
  async (categoryId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${baseURL}/fetchCategory/${categoryId}`
      );
      return response.data;
    } catch (error) {
      return error.response.data.message;
    }
  }
);

export const updateCategory = createAsyncThunk(
  "categories/updateCategory",
  async (category, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("categoryName", category.get('categoryName'));
      formData.append("categoryDescription", category.get('categoryDescription'));
      formData.append("categoryImage", category.get('categoryImage'));

      const response = await axios.put(
        `${baseURL}/updateCategory/${category.get('id')}`,
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

export const deleteCategory = createAsyncThunk(
  "categories/deleteCategory",
  async (categoryId, { rejectWithValue }) => {
    try {
      await axios.delete(`${baseURL}/deleteCategory/${categoryId}`);
      return categoryId;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const categoriesSlice = createSlice({
    name: "categories",
    initialState,
    reducers: {
        resetCategoryState: (state) => initialState,
    },
    extraReducers: (builder) => {
        // create reducers
        builder
        .addCase(createCategory.pending, (state) => {
            state.responseStatus = "pending";
        })
        .addCase(createCategory.fulfilled, (state) => {
            state.responseStatus = "success";
            state.responseMessage = "Category created successfully";
        })
        .addCase(createCategory.rejected, (state, action) => {
            state.responseStatus = "rejected";
            state.responseMessage = action.payload;
        });

        // get all reducers
        builder
        .addCase(getCategories.pending, (state) => {
            state.responseStatus = "pending";
        })
        .addCase(getCategories.fulfilled, (state, action) => {
            state.categories = action.payload;
            state.responseStatus = "success";
        })
        .addCase(getCategories.rejected, (state, action) => {
            state.responseStatus = "rejected";
            state.responseMessage = action.payload;
        });

        // get reducers
        builder
        .addCase(getCategory.pending, (state) => {
            state.responseStatus = "pending";
        })
        .addCase(getCategory.fulfilled, (state, action) => {
            state.categories = action.payload;
            state.responseStatus = "success";
        })
        .addCase(getCategory.rejected, (state, action) => {
            state.responseStatus = "rejected";
            state.responseMessage = action.payload;
        });

        // delete reducers
        builder
        .addCase(deleteCategory.pending, (state) => {
            state.responseStatus = "pending";
        })
        .addCase(deleteCategory.fulfilled, (state, action) => {
            state.responseStatus = "success";
            state.responseMessage = "Category deleted successfully";
        })
        .addCase(deleteCategory.rejected, (state, action) => {
            state.responseStatus = "rejected";
            state.responseMessage = action.payload;
        });

        // update reducers
        builder
        .addCase(updateCategory.pending, (state) => {
            state.responseStatus = "pending";
        })
        .addCase(updateCategory.fulfilled, (state, action) => {
            if (Array.isArray(state.categories)) {
            state.categories = state.categories.map((category) =>
                category.id === action.payload.id ? action.payload : category
            );
            } else {
            state.categories = action.payload;
            }
            state.responseStatus = "success";
            state.responseMessage = "Category updated successfully";
        })
        .addCase(updateCategory.rejected, (state, action) => {
            state.responseStatus = "rejected";
            state.responseMessage = action.payload;
        });
    },
});

export const { resetCategoryState } = categoriesSlice.actions;
export default categoriesSlice.reducer;
