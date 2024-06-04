import { useDispatch } from "react-redux";
import styles from "./TransactionForm.module.css";
import { useRef } from "react";
import { addTransaction } from "../../../store/transactionSlice";
import { nowDateTimeValue } from "../../../util/datetime";

const TransactionForm = ({ categories, accounts, onClose }) => {
  const nameRef = useRef();
  const creditRef = useRef();
  const debitRef = useRef();
  const descriptionRef = useRef();
  const timestampRef = useRef();
  const categoryRef = useRef();
  const accountRef = useRef();
  const amountRef = useRef();

  const dispatch = useDispatch();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const name = nameRef.current.value;
    const transactionType = [creditRef, debitRef].find(
      (ref) => ref.current.checked
    )?.current.value;
    const description = descriptionRef.current.value;
    const datetime = timestampRef.current.value;
    const category = categoryRef.current.value || undefined;
    const account = accountRef.current.value || undefined;
    const amount = amountRef.current.value;
    dispatch(
      addTransaction({
        name,
        transactionType,
        description,
        datetime,
        category,
        account,
        amount,
      })
    );
    onClose();
  };

  return (
    <form className={styles.form} onSubmit={handleFormSubmit}>
      <h2 className={styles.title}>Add Transaction</h2>

      <div className={styles.field}>
        <label className={styles.label}>Name</label>
        <input ref={nameRef} type="text" className={styles.input} required />
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Amount</label>

        <input
          type="number"
          step="0.01"
          className={styles.input}
          ref={amountRef}
          required
        />
      </div>

      <div className={styles.field}>
        {/* <label className={styles.label}>Transaction Type</label> */}
        <div className={styles.radioGroup}>
          <label className={styles.radioLabel}>
            <input
              ref={debitRef}
              type="radio"
              value="debit"
              name="transactionType"
              className={styles.radio}
              defaultChecked
              key="debit"
            />
            Debit
          </label>
          <label className={styles.radioLabel}>
            <input
              ref={creditRef}
              type="radio"
              value="credit"
              name="transactionType"
              className={styles.radio}
              key="credit"
            />
            Credit
          </label>
        </div>
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Description</label>
        <textarea ref={descriptionRef} className={styles.textarea}></textarea>
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Date & Time</label>
        <input
          ref={timestampRef}
          type="datetime-local"
          className={styles.input}
          defaultValue={nowDateTimeValue(Date.now())}
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Category</label>
        <select className={styles.select} ref={categoryRef}>
          <option value="">Select a category</option>
          {categories?.map((category) => (
            <option value={category._id} key={category._id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Account</label>
        <select className={styles.select} ref={accountRef}>
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
        <button type="button" className={styles.cancelButton} onClick={onClose}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default TransactionForm;
