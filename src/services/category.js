import api from "./api";

export const fetchCategories = () => {
  return api
    .get("/category/all")
    .then((res) => res.data)
    .catch((err) => {
      return Promise.reject(err);
    });
};

export const addCategory = (data) => {
  return api
    .post("/category/create", data)
    .then((res) => res.data)
    .catch((err) => {
      return Promise.reject(err);
    });
};
