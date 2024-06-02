import { createSlice } from "@reduxjs/toolkit";

import {
  fetchTransactions as fetchTransactionsService,
  addTransaction as addTransactionService,
} from "../services/transaction";

export const transactionSlice = createSlice({
  name: "transactions",
  initialState: {
    data: null,
    totalExpense: 0,
    totalCredit: 0,
    balance: 0,
  },
  reducers: {
    setTransactions: (state, action) => {
      const { data, totalExpense, totalCredit, balance } = action.payload;
      state.data = data;
      state.totalExpense = totalExpense;
      state.totalCredit = totalCredit;
      state.balance = balance;
    },

    addTransaction: (state, action) => {
      state.data.push(action.payload);
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
      const {
        _id,
        name,
        description,
        datetime,
        amount,
        transaction_type: transactionType,
      } = tx;
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

    // calculate monthly expense, credit and balance for current month
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    const { totalExpense, totalCredit, balance } = transactions.reduce(
      (acc, transaction) => {
        const transactionDate = new Date(transaction.datetime);
        const transactionMonth = transactionDate.getMonth();
        const transactionYear = transactionDate.getFullYear();

        if (
          transactionMonth === currentMonth &&
          transactionYear === currentYear
        ) {
          if (transaction.transaction_type === "debit") {
            acc.totalExpense += transaction.amount;
          } else if (transaction.transaction_type === "credit") {
            acc.totalCredit += transaction.amount;
          }
        }

        acc.balance = acc.totalCredit - acc.totalExpense;
        return acc;
      },
      { totalExpense: 0, totalCredit: 0, balance: 0 }
    );

    dispatch(
      transactionActions.setTransactions({
        data,
        totalExpense,
        totalCredit,
        balance,
      })
    );
  };
};

export const addTransaction = (data) => {
  return async (dispatch) => {
    const res = await addTransactionService(data);
    console.log(res);
    dispatch(transactionActions.addTransaction(data));
  };
};

export default transactionActions;
