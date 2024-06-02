import { configureStore } from "@reduxjs/toolkit";
import { transactionSlice } from "./transactionSlice";
import { accountSlice } from "./accountSlice";
import { categorySlice } from "./categorySlice";

const store = configureStore({
  reducer: {
    transactions: transactionSlice.reducer,
    accounts: accountSlice.reducer,
    categories: categorySlice.reducer,
  },
});

export default store;
