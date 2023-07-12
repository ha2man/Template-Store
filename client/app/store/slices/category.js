import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import CategoryService from "../services/category.service";

export const getCategories = createAsyncThunk(
  "category/list",
  async (data, thunkAPI) => {
    try {
      const res = CategoryService.getCategories(thunkAPI.dispatch, data);
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue();
    }
  }
);

const initialState = {
    categories: [],
    isLoading: false,
    error: "",
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    }
  },
});

const { reducer, actions } = categorySlice;

export const { setCategories, setLoading, setError } = actions
export default reducer;