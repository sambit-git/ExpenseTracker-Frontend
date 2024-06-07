import api from "./api";

export const register = (data) => {
  return api
    .post("/user/register", data)
    .then((res) => res.data)
    .catch((err) => {
      return Promise.reject(err);
    });
};

export const login = (data) => {
  return api
    .post("/user/login", data)
    .then((res) => {
      const { token, ...user } = res.data;
      if (token) localStorage.setItem("token", token);
      return user;
    })
    .catch((err) => {
      return Promise.reject(err);
    });
};

export const isLoggedIn = () => {
  return api
    .get("/user/is_logged_in")
    .then((res) => res.data)
    .catch((err) => {
      return Promise.reject(err);
    });
};
