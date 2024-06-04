import { useRef, useState } from "react";
import { isValidEmail } from "../../util/pattern_validations";
import { login } from "../../services/user";
import styles from "./Form.module.css";
import Spinner from "../common/Spinner";

const LoginForm = ({ onLogin }) => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [loginError, setLoginError] = useState();
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setLoginError("");
    const data = { password: passwordRef.current.value };
    if (isValidEmail(emailRef.current.value))
      data["email"] = emailRef.current.value;
    else data["username"] = emailRef.current.value;
    login(data)
      .then((res) => {
        setIsLoggingIn(false);
        onLogin(res);
      })
      .catch((err) => {
        setIsLoggingIn(false);
        setLoginError(err?.response?.data?.message);
      });
  };
  return (
    <>
      <h1 className={styles.title}>Login</h1>
      <form method="post" onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Email or Username"
          className={styles.input}
          ref={emailRef}
          required
        />
        <input
          type="password"
          placeholder="Password"
          ref={passwordRef}
          className={styles.input}
          required
        />
        {loginError && <div>{loginError}</div>}
        <button type="submit" className={styles.button} disabled={isLoggingIn}>
          {isLoggingIn ? <Spinner /> : "Login"}
          {/* {!isLoggingIn ? <Spinner /> : "Login"} */}
        </button>
      </form>
    </>
  );
};

export default LoginForm;
