import { createSlice } from "@reduxjs/toolkit";

import {
  fetchCategories,
  addCategory as addCategoryService,
} from "../services/category";

export const categorySlice = createSlice({
  name: "categories",
  initialState: {
    data: null,
  },
  reducers: {
    setCategories: (state, action) => {
      state.data = action.payload;
    },

    addCategory: (state, action) => {
      state.data.push(action.payload);
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

export const addCategory = (data) => {
  return async (dispatch) => {
    const res = await addCategoryService(data);
    data._id = res._id;
    dispatch(categoryActions.addCategory(data));
  };
};

export default categoryActions;
