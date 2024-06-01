import api from "./api";

export const fetchTransactions = () => {
  return api
    .get("/transaction/all")
    .then((res) => res.data)
    .catch((err) => {
      return Promise.reject(err);
    });
};
