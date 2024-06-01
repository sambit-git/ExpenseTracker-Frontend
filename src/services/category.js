import api from "./api";

export const fetchCategories = () => {
  return api
    .get("/category/all")
    .then((res) => res.data)
    .catch((err) => {
      return Promise.reject(err);
    });
};
