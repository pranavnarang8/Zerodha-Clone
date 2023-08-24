import { configureStore } from "@reduxjs/toolkit";
import dialogReducer from "../features/dialogSlice";
import stockReducer from "../features/stockSlice";
import userReducer from "../features/userSlice";

export const store = configureStore({
  reducer: {
    dialog: dialogReducer,
    stock: stockReducer,
    user: userReducer,
  },
});
