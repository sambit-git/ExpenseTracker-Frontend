import React from "react";
import ReactDOM from "react-dom";
import styles from "./Modal.module.css";

const Modal = () => {
  return ReactDOM.createPortal(
    <dialog className={styles.dialog}>
      <div>
        <p>This is a modal dialog.</p>
        <form method="dialog">
          <button className={styles.button}>Close</button>
        </form>
      </div>
    </dialog>,
    document.querySelector(".modal")
  );
};

export default Modal;
