export const calculateAmounts = (accounts, transactions, categories) => {
  const categoriesAmounts = {};
  const accountsAmounts = {};
  const monthlyAmounts = { credit: 0, debit: 0 };

  const today = new Date();
  const thisMonth = today.getMonth();
  const thisYear = today.getFullYear();

  // initialize accountsAmounts
  accounts.forEach(
    (acc) =>
      (accountsAmounts[acc._id] = {
        name: acc.name,
        balance: acc.balance,
        monthlyDebit: 0,
        monthlyCredit: 0,
        totalDebit: 0,
        totalCredit: 0,
      })
  );
  // initialize categoriesAmounts
  categories.forEach(
    (cat) =>
      (categoriesAmounts[cat._id] = {
        name: cat.name,
        monthlyDebit: 0,
        monthlyCredit: 0,
      })
  );

  transactions.forEach((tx) => {
    const txDate = new Date(tx.datetime);
    const txMonth = txDate.getMonth();
    const txYear = txDate.getFullYear();

    // account wise total credit and debit calculation
    if (tx.account) {
      const accountLastUpdated = new Date(tx.account.updatedAt);
      if (txDate > accountLastUpdated) {
        if (tx.transactionType === "debit")
          accountsAmounts[tx.account._id].totalDebit += tx.amount;
        else accountsAmounts[tx.account._id].totalCredit += tx.amount;
      }
    }

    // monthly amounts calculation
    if (txMonth === thisMonth && txYear === thisYear) {
      if (tx.transactionType == "debit") {
        monthlyAmounts["debit"] += tx.amount;

        if (tx.account)
          accountsAmounts[tx.account._id].monthlyDebit += tx.amount;

        if (tx.category)
          categoriesAmounts[tx.category._id].monthlyDebit += tx.amount;
      } else {
        monthlyAmounts["credit"] += tx.amount;

        if (tx.account)
          accountsAmounts[tx.account._id].monthlyCredit += tx.amount;

        if (tx.category)
          categoriesAmounts[tx.category._id].monthlyCredit += tx.amount;
      }
    }
  });
  let totalBalance = 0;
  for (const acc in accountsAmounts) {
    const balance =
      accountsAmounts[acc].balance +
      accountsAmounts[acc].totalCredit -
      accountsAmounts[acc].totalDebit;
    accountsAmounts[acc].balance = balance;
    totalBalance += balance;
  }

  return {
    category: categoriesAmounts,
    account: accountsAmounts,
    monthly: monthlyAmounts,
    balance: totalBalance,
  };
};
