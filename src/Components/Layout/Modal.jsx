import React, { forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";
import styles from "./Modal.module.css";

const Modal = forwardRef(({ Frm, categories, accounts }, ref) => {
  const dialog = useRef();

  useImperativeHandle(ref, () => {
    return {
      open() {
        dialog.current.showModal();
      },
    };
  });
  return createPortal(
    <dialog className={styles.dialog} ref={dialog}>
      <Frm categories={categories} accounts={accounts} />
    </dialog>,
    document.querySelector(".modal")
  );
});

export default Modal;
