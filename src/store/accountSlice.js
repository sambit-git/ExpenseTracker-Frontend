import { createSlice } from "@reduxjs/toolkit";

import { fetchAccounts } from "../services/account";

export const accountSlice = createSlice({
  name: "accounts",
  initialState: {
    data: null,
    totalExpense: 0,
    totalCredit: 0,
    balance: 0,
  },
  reducers: {
    setAccounts: (state, action) => {
      const { data, totalExpense, totalCredit, balance } = action.payload;
      state.data = data;
      state.totalExpense = totalExpense;
      state.totalCredit = totalCredit;
      state.balance = balance;
    },
  },
});

const accountActions = accountSlice.actions;

// Action Creator Thunks
export const getAccounts = () => {
  return async (dispatch, getState) => {
    const state = getState();
    if (state.accounts.data !== null) return;

    const accounts = await fetchAccounts();

    // trim data as required by component
    const data = accounts.map((tx) => {
      const {
        _id,
        name,
        description,
        datetime,
        amount,
        account_type: accountType,
      } = tx;
      const account = tx?.account?.name;
      const category = tx?.category?.name;
      return {
        _id,
        name,
        description,
        datetime,
        amount,
        accountType,
        account,
        category,
      };
    });

    // calculate monthly expense, credit and balance for current month
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    const { totalExpense, totalCredit, balance } = accounts.reduce(
      (acc, account) => {
        const accountDate = new Date(account.datetime);
        const accountMonth = accountDate.getMonth();
        const accountYear = accountDate.getFullYear();

        if (accountMonth === currentMonth && accountYear === currentYear) {
          if (account.account_type === "debit") {
            acc.totalExpense += account.amount;
          } else if (account.account_type === "credit") {
            console.log(account.amount);
            acc.totalCredit += account.amount;
          }
        }

        acc.balance = acc.totalCredit - acc.totalExpense;
        return acc;
      },
      { totalExpense: 0, totalCredit: 0, balance: 0 }
    );

    dispatch(
      accountActions.setAccounts({
        data,
        totalExpense,
        totalCredit,
        balance,
      })
    );
  };
};

export default accountActions;
