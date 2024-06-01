import { configureStore } from "@reduxjs/toolkit";
import { transactionSlice } from "./transactionSlice";

const store = configureStore({
  reducer: { transactions: transactionSlice.reducer },
});

export default store;
