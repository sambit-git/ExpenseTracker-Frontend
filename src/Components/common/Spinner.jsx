// Spinner.js
import React from "react";
import { ClipLoader } from "react-spinners";
import styles from "./Spinner.module.css"; // assuming you are using CSS modules for styling

const Spinner = () => {
  return (
    <div className={styles.spinnerContainer}>
      <ClipLoader size={50} color={"#123abc"} loading={true} />
    </div>
  );
};

export default Spinner;
