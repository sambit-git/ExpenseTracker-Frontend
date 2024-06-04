import React from "react";
import { format, isToday, isYesterday } from "date-fns"; // Using date-fns for date formatting
import Transaction from "./Transaction"; // Assuming this is your Transaction component

import styles from "./GroupedTransactions.module.css";
const groupTransactionsByDate = (transactions) => {
  return transactions.reduce((acc, transaction) => {
    const date = new Date(transaction.datetime); // Assuming your transactions have a date property
    const dateString = format(date, "yyyy-MM-dd");

    if (!acc[dateString]) {
      acc[dateString] = [];
    }

    acc[dateString].push(transaction);
    return acc;
  }, {});
};

const GroupedTransactions = ({ transactions }) => {
  const groupedTransactions = groupTransactionsByDate(transactions);

  const renderTransactions = () => {
    const sortedDates = Object.keys(groupedTransactions).sort(
      (a, b) => new Date(b) - new Date(a)
    );

    return sortedDates.map((dateString) => {
      const date = new Date(dateString);
      let header;

      if (isToday(date)) {
        header = "Today";
      } else if (isYesterday(date)) {
        header = "Yesterday";
      } else {
        header = format(date, "dd-MMM-yyyy");
      }

      return (
        <div key={dateString}>
          <p className={styles.title}>{header}</p>
          {groupedTransactions[dateString].map((tx) => (
            <Transaction key={tx._id} {...tx} />
          ))}
        </div>
      );
    });
  };

  return <div className="transactions-container">{renderTransactions()}</div>;
};

export default GroupedTransactions;
