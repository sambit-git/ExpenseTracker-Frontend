import { useState } from "react";
import styles from "./Transaction.module.css";

const Transaction = ({
  name,
  amount,
  transactionType,
  description,
  category,
  account,
}) => {
  const [showTags, setShowTags] = useState(false);

  const toggleShowTags = () => setShowTags((state) => !state);
  return (
    <div className={styles.transaction} onClick={toggleShowTags}>
      <div className={`${styles.amount} ${styles[transactionType]}`}>
        {amount}
      </div>
      <div className={styles.info}>
        <div className={styles.name}>{name}</div>
        <div className={styles.description}>{description}</div>
      </div>
      <div className={`${styles.tags} ${showTags && styles["show-tags"]}`}>
        {account?.name && <div className={styles.account}>{account.name}</div>}
        {category?.name && (
          <div className={styles.category}>{category.name}</div>
        )}
      </div>
    </div>
  );
};

export default Transaction;
