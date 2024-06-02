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
      state.data = action.payload;
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
    const data = accounts.map((acc) => {
      const { _id, name, description, balance } = acc;
      return { _id, name, description, balance };
    });

    dispatch(accountActions.setAccounts(data));
  };
};

export default accountActions;
