import { useDispatch } from "react-redux";
import styles from "./TransactionForm.module.css";
import { useRef } from "react";
import { addTransaction } from "../../../store/transactionSlice";
import { nowDateTimeValue } from "../../../util/datetime";

const TransactionForm = ({ categories, accounts }) => {
  const txNameRef = useRef();
  const txCreditRef = useRef();
  const txDebitRef = useRef();
  const txDescriptionRef = useRef();
  const txTimestampRef = useRef();
  const txCategoryRef = useRef();
  const txAccountRef = useRef();
  const txAmountRef = useRef();

  const dispatch = useDispatch();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const name = txNameRef.current.value;
    const transaction_type = [txCreditRef, txDebitRef].find(
      (ref) => ref.current.checked
    )?.current.value;
    const description = txDescriptionRef.current.value;
    const timestamp = txTimestampRef.current.value;
    const category = txCategoryRef.current.value || undefined;
    const account = txAccountRef.current.value || undefined;
    const amount = txAmountRef.current.value;
    dispatch(
      addTransaction({
        name,
        transaction_type,
        description,
        timestamp,
        category,
        account,
        amount,
      })
    );
  };

  return (
    <form className={styles.form} onSubmit={handleFormSubmit}>
      <h2 className={styles.title}>Add Transaction</h2>

      <div className={styles.field}>
        <label className={styles.label}>Name:</label>
        <input ref={txNameRef} type="text" className={styles.input} required />
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Amount:</label>
        <input
          type="text"
          className={styles.input}
          ref={txAmountRef}
          required
        />
      </div>

      <div className={styles.field}>
        {/* <label className={styles.label}>Transaction Type:</label> */}
        <div className={styles.radioGroup}>
          <label className={styles.radioLabel}>
            <input
              ref={txDebitRef}
              type="radio"
              value="debit"
              name="transaction_type"
              className={styles.radio}
              defaultChecked
              key="debit"
            />
            Debit
          </label>
          <label className={styles.radioLabel}>
            <input
              ref={txCreditRef}
              type="radio"
              value="credit"
              name="transaction_type"
              className={styles.radio}
              key="credit"
            />
            Credit
          </label>
        </div>
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Description:</label>
        <textarea ref={txDescriptionRef} className={styles.textarea}></textarea>
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Date & Time:</label>
        <input
          ref={txTimestampRef}
          type="datetime-local"
          className={styles.input}
          defaultValue={nowDateTimeValue(Date.now())}
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Category:</label>
        <select className={styles.select} ref={txCategoryRef}>
          <option value="">Select a category</option>
          {categories?.map((category) => (
            <option value={category._id} key={category._id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Account:</label>
        <select className={styles.select} ref={txAccountRef}>
          <option value="">Select an account</option>
          {accounts?.map((account) => (
            <option value={account._id} key={account._id}>
              {account.name}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.buttons}>
        <button type="submit" className={styles.button}>
          Submit
        </button>
        <button type="button" className={styles.cancelButton}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default TransactionForm;
