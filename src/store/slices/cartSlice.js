import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const api = axios.create({
  baseURL: "https://dummyjson.com", // our API base URL
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Assuming you store the token in localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const getAllItems = createAsyncThunk("products", async () => {
  const response = await api.get("/products");
  return response.data.products;
});

export const searchItem = createAsyncThunk("searchItem", async (searchTerm) => {
  const response = await api.get(`/products/search?q=${searchTerm}`);
  return response.data.products;
});

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: {},
    isOpenCart: false,
    products: [],
    isLoading: false,
    searchItems: [],
  },
  reducers: {
    addItem(state, action) {
      const cart = { ...state.cart };
      if (cart[action.payload.id]) {
        cart[action.payload.id] = {
          ...cart[action.payload.id],
          quantity: (state.cart[action.payload.id]?.quantity || 0) + 1,
        };
      } else {
        cart[action.payload.id] = {
          value: action.payload,
          quantity: 1,
        };
      }
      return {
        ...state,
        cart,
      };
    },
    toggleCart: (state) => {
      return {
        ...state,
        isOpenCart: !state.isOpenCart,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllItems.fulfilled, (state, action) => {
      state.isLoading = false;
      state.products = action.payload;
    });
    builder.addCase(searchItem.fulfilled, (state, action) => {
      state.isLoading = false;
      state.searchItems = action.payload;
    });
  },
});

export const { addItem, toggleCart } = cartSlice.actions;
export default cartSlice.reducer;
