import { useRef } from "react";
import { isValidEmail } from "../../util/pattern_validations";
import { login } from "../../services/user";
import styles from "./Form.module.css";

const LoginForm = ({ onLogin }) => {
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleLogin = (e) => {
    e.preventDefault();
    const data = { password: passwordRef.current.value };
    if (isValidEmail(emailRef.current.value))
      data["email"] = emailRef.current.value;
    else data["username"] = emailRef.current.value;
    login(data)
      .then((res) => onLogin(res))
      .catch((err) => console.log(err));
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
        <button type="submit" className={styles.button}>
          Login
        </button>
      </form>
    </>
  );
};

export default LoginForm;
