import { createSlice } from "@reduxjs/toolkit";

import {
  fetchTransactions as fetchTransactionsService,
  addTransaction as addTransactionService,
} from "../services/transaction";
import { findInsertionIndex } from "../util/datetime";
import { act } from "react";

export const transactionSlice = createSlice({
  name: "transactions",
  initialState: {
    data: null,
    totalExpense: 0,
    monthlyExpense: 0,
    totalCredit: 0,
    balance: 0,
  },
  reducers: {
    setTransactions: (state, action) => {
      state.data = action.payload;
    },

    addTransaction: (state, action) => {
      const index = findInsertionIndex(state.data, action.payload);
      state.data.splice(index, 0, action.payload);
    },

    setAmounts: (state, action) => {
      const { totalExpense, monthlyExpense, totalCredit, balance } =
        action.payload;
      if (totalCredit) state.totalCredit = totalCredit;
      if (totalExpense) state.totalExpense = totalExpense;
      if (monthlyExpense) state.monthlyExpense = monthlyExpense;
      if (balance) state.balance = balance;
    },
  },
});

const transactionActions = transactionSlice.actions;

// Action Creator Thunks
export const getTransactions = () => {
  return async (dispatch, getState) => {
    const state = getState();
    if (state.transactions.data !== null) return;

    const transactions = await fetchTransactionsService();

    // trim data as required by component
    const data = transactions.map((tx) => {
      const { _id, name, description, datetime, amount, transactionType } = tx;
      const account = tx?.account?.name;
      const category = tx?.category?.name;
      return {
        _id,
        name,
        description,
        datetime,
        amount,
        transactionType,
        account,
        category,
      };
    });

    data.sort((a, b) => new Date(b.datetime) - new Date(a.datetime));

    dispatch(transactionActions.setTransactions(data));
  };
};

export const addTransaction = (data) => {
  return async (dispatch) => {
    const res = await addTransactionService(data);
    data._id = res._id;
    dispatch(transactionActions.addTransaction(data));
  };
};

export default transactionActions;
