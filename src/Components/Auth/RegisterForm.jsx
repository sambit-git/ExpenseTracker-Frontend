import { useRef, useState } from "react";
import styles from "./Form.module.css";
import {
  isValidEmail,
  isValidPassword,
  isValidUsername,
} from "../../util/pattern_validations";
import { register } from "../../services/user";

const RegisterForm = ({ onSuccess }) => {
  const fullNameRef = useRef();
  const emailRef = useRef();
  const usernameRef = useRef();
  const passwordRef = useRef();

  const [error, setError] = useState();

  const handleRegister = (e) => {
    e.preventDefault();
    const fullName = fullNameRef.current.value;
    const email = emailRef.current.value;
    const username = usernameRef.current.value;
    const password = passwordRef.current.value;
    if (!isValidEmail(email)) {
      setError("invalid email");
      return;
    } else if (!isValidUsername(username)) {
      setError("invalid username");
      return;
    } else if (!isValidPassword(password)) {
      setError(
        "password must be of 8 characters containing at lease one character \
        from uppercase, lowercase, number and special-character"
      );
      return;
    }
    register({ fullName, username, email, password })
      .then((res) => onSuccess())
      .catch((err) => {
        if (err?.response?.data) {
          if (err.response.status != 200) setError(err.response.data.message);
          else console.log(err);
        } else {
          console.log(err);
        }
        return;
      });
  };

  return (
    <>
      <h1 className={styles.title}>Register</h1>
      <form method="post" onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Full Name"
          className={styles.input}
          ref={fullNameRef}
          required
        />
        <input
          type="text"
          placeholder="Username"
          className={styles.input}
          ref={usernameRef}
          required
        />
        <input
          type="email"
          placeholder="Email"
          className={styles.input}
          ref={emailRef}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className={styles.input}
          ref={passwordRef}
          required
        />
        {error}
        <button type="submit" className={styles.button}>
          Register
        </button>
      </form>
    </>
  );
};

export default RegisterForm;
