import { useDispatch } from "react-redux";
import styles from "./CategoryForm.module.css";
import { useRef } from "react";
import { addCategory } from "../../../store/categorySlice";

const CategoryForm = ({ onClose }) => {
  const nameRef = useRef();
  const descriptionRef = useRef();

  const dispatch = useDispatch();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const name = nameRef.current.value;
    const description = descriptionRef.current.value;
    dispatch(
      addCategory({
        name,
        description,
      })
    );
    onClose();
  };

  return (
    <form className={styles.form} onSubmit={handleFormSubmit}>
      <h2 className={styles.title}>Add Category</h2>

      <div className={styles.field}>
        <label className={styles.label}>Name</label>
        <input ref={nameRef} type="text" className={styles.input} required />
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Description</label>
        <textarea ref={descriptionRef} className={styles.textarea}></textarea>
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

export default CategoryForm;
