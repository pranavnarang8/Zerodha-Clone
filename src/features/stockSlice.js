import { createSlice } from "@reduxjs/toolkit";

export const stockSlice = createSlice({
  name: "stock",
  initialState: {
    selectedStock: null,
    addHolding: null,
    holdings: null,
  },
  reducers: {
    setStock: (state, action) => {
      state.selectedStock = action.payload;
    },
    resetStock: (state) => {
      state.selectedStock = null;
    },
    buyStock: (state, action) => {
      state.addHolding = action.payload;
    },
    resetBuyStock: (state) => {
      state.addHolding = null;
    },
  },
});

export const { setStock, resetStock, buyStock, resetBuyStock } =
  stockSlice.actions;
export const selectStock = (state) => state.stock.selectedStock;
export const selectHolding = (state) => state.stock.addHolding;
export default stockSlice.reducer;
