import Card from "./Card";
import styles from "./MonthlyCard.module.css";

const MonthlyCard = ({ expenses = 0, balance = 0 }) => {
  return (
    <div className={styles.summary}>
      <Card content={<h2>{expenses}</h2>} caption="Expense" cssClass="red" />
      <Card content={<h2>{balance}</h2>} caption="Balance" cssClass="green" />
    </div>
  );
};

export default MonthlyCard;
