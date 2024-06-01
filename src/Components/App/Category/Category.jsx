import styles from "./Category.module.css";

const Category = ({ name, description, balance }) => {
  return (
    <div className={styles.category}>
      <div className={styles.logo}>Logo</div>
      <div className={styles.info}>
        <div className={styles.name}>{name}</div>
        <div className={styles.description}>{description}</div>
        <div className={styles.debit}>Expenses: 520</div>
      </div>
    </div>
  );
};

export default Category;
