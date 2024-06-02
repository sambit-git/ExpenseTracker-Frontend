// src/LoginPage.js
import React, { useEffect, useState } from "react";
import styles from "./AuthPage.module.css";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import { isLoggedIn } from "../../services/user";

import { useNavigate } from "react-router-dom";

const AuthPage = () => {
  const [isLoginPage, setIsLoginPage] = useState(true);

  const [user, setUser] = useState();
  const navigate = useNavigate();

  const loginUser = (tmpUser) => {
    if (tmpUser) setUser(tmpUser);
  };

  useEffect(() => {
    isLoggedIn().then((res) => loginUser(res));
  }, []);

  useEffect(() => {
    if (user) {
      navigate("/transactions/all", { replace: true });
    }
  }, [user, navigate]);

  const handleEnableLogin = () => !isLoginPage && setIsLoginPage(true);
  const handleDisableLogin = () => isLoginPage && setIsLoginPage(false);

  return (
    <div className={styles["page-container"]}>
      <img
        className={styles.img}
        src="./the-expense-tracker.png"
        alt="expense-tracker-text"
      />
      <div className={styles["tabs-container"]}>
        <div className={styles.tabs}>
          <button
            onClick={handleEnableLogin}
            className={
              isLoginPage ? `${styles.tab} ${styles.active}` : styles.tab
            }
          >
            Login
          </button>
          <button
            onClick={handleDisableLogin}
            className={
              !isLoginPage ? `${styles.tab} ${styles.active}` : styles.tab
            }
          >
            Regster
          </button>
        </div>
        <div className={styles["form-container"]}>
          {isLoginPage ? <LoginForm onLogin={loginUser} /> : <RegisterForm />}
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
