import { createSlice } from "@reduxjs/toolkit";

import { fetchCategories } from "../services/category";

export const categorySlice = createSlice({
  name: "categories",
  initialState: {
    data: null,
  },
  reducers: {
    setCategories: (state, action) => {
      state.data = action.payload;
    },
  },
});

const categoryActions = categorySlice.actions;

// Action Creator Thunks
export const getCategories = () => {
  return async (dispatch, getState) => {
    const state = getState();
    if (state.categories.data !== null) return;

    const categories = await fetchCategories();

    // trim data as required by component
    const data = categories.map((cat) => {
      const { _id, name, description } = cat;
      return { _id, name, description };
    });

    dispatch(categoryActions.setCategories(data));
  };
};

export default categoryActions;
