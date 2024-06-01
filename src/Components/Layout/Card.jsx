import React from "react";

import styles from "./Card.module.css";

const Card = ({ content, caption, cssClass }) => {
  return (
    <div className={`${styles.card} ${styles[cssClass]}`}>
      <div className={styles.content}>{content}</div>
      <div className={styles.caption}>{caption}</div>
    </div>
  );
};

export default Card;
