import { useDispatch } from "react-redux";
import styles from "./AccountForm.module.css";
import { useRef } from "react";
import { addAccount } from "../../../store/accountSlice";

const AccountForm = ({ onClose }) => {
  const nameRef = useRef();
  const descriptionRef = useRef();
  const balanceRef = useRef();

  const dispatch = useDispatch();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const name = nameRef.current.value;
    const description = descriptionRef.current.value;
    const balance = balanceRef.current.value;
    dispatch(
      addAccount({
        name,
        description,
        balance,
      })
    );
    onClose();
  };

  return (
    <form className={styles.form} onSubmit={handleFormSubmit}>
      <h2 className={styles.title}>Add Account</h2>

      <div className={styles.field}>
        <label className={styles.label}>Name</label>
        <input ref={nameRef} type="text" className={styles.input} required />
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Description</label>
        <textarea ref={descriptionRef} className={styles.textarea}></textarea>
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Balance</label>
        <input
          ref={balanceRef}
          type="number"
          step="0.01"
          className={styles.input}
        />
      </div>

      <div className={styles.buttons}>
        <button type="submit" className={styles.button}>
          Submit
        </button>
        <button type="button" className={styles.cancelButton} onClick={onClose}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default AccountForm;
