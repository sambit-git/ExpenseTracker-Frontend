import api from "./api";

export const fetchAccounts = () => {
  return api
    .get("/account/all")
    .then((res) => res.data)
    .catch((err) => {
      return Promise.reject(err);
    });
};

export const addAccount = (data) => {
  return api
    .post("/account/create", data)
    .then((res) => res.data)
    .catch((err) => {
      return Promise.reject(err);
    });
};
