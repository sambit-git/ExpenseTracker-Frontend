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
    monthlyExpense: 0,
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
      const { monthlyExpense, balance } = action.payload;
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

      let account, category;
      if (tx?.account?._id) {
        account = {
          name: tx?.account?.name,
          _id: tx?.account?._id,
          updatedAt: tx?.account?.updatedAt,
        };
      }
      if (tx?.category?._id) {
        category = { name: tx?.category?.name, _id: tx?.category?._id };
      }
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
    data.amount = +data.amount;
    dispatch(transactionActions.addTransaction(data));
  };
};

export default transactionActions;
