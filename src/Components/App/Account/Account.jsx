import styles from "./Account.module.css";

const Account = ({ name, description, balance }) => {
  return (
    <div className={styles.account}>
      <div className={styles.logo}>Logo</div>
      <div className={styles.info}>
        <div className={styles.name}>{name}</div>
        <div className={styles.description}>{description}</div>
        <div className={styles.ammount}>
          <div className={styles.debit}>Expenses: 520</div>{" "}
          <div className={styles.credit}>Balance: {balance}</div>
        </div>
      </div>
    </div>
  );
};

export default Account;
