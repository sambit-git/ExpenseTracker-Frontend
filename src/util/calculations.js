export const calculateExpensesAndBalance = (accounts, transactions) => {
  let totalCredit = 0;
  let totalExpense = 0;
  let balance = 0;
  let monthlyExpense = 0;

  const today = new Date();
  const thisMonth = today.getMonth();
  const thisYear = today.getFullYear();

  accounts.forEach((account) => {
    balance += account.balance;
  });

  transactions.forEach((transaction) => {
    const transactionDate = new Date(transaction.datetime);
    const transactionMonth = transactionDate.getMonth();
    const transactionYear = transactionDate.getFullYear();
    if (transaction.account) {
      const accountLastUpdated = new Date(transaction.account.updatedAt);
      if (transactionDate < accountLastUpdated) return;
    }
    if (transaction.transactionType == "debit") {
      totalExpense += transaction.amount;
      if (transactionMonth === thisMonth && transactionYear === thisYear)
        monthlyExpense += transaction.amount;
    } else totalCredit += transaction.amount;
  });
  totalCredit = totalCredit.toFixed(2);
  totalExpense = totalExpense.toFixed(2);
  monthlyExpense = monthlyExpense.toFixed(2);
  balance = balance.toFixed(2);
  return { totalCredit, totalExpense, monthlyExpense, balance };
};
