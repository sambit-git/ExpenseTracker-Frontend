// Hooks
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

// styles
import styles from "./AppLayout.module.css";

// components
import OptionsBar from "./OptionsBar";
import MonthlyCard from "./MonthlyCard";
import Account from "../App/Account/Account";
import Category from "../App/Category/Category";

import AccountForm from "../App/Account/AccountForm";
import TransactionForm from "../App/Transaction/TransactionForm";
import CategoryForm from "../App/Category/CategoryForm";

// Action Creators - Thunks
import transactionActions, {
  getTransactions,
} from "../../store/transactionSlice";
import { getAccounts } from "../../store/accountSlice";
import { getCategories } from "../../store/categorySlice";
import GroupedTransactions from "../App/Transaction/GroupedTransactions";
import { calculateAmounts } from "../../util/calculations";

const AppLayout = () => {
  const options = ["Transaction", "Account", "Category"];
  const [selected, setSelected] = useState(options[0]);

  const transactions = useSelector((state) => state.transactions.data);
  const monthlyExpense = useSelector(
    (state) => state.transactions.monthlyExpense
  );
  const balance = useSelector((state) => state.transactions.balance);
  const accounts = useSelector((state) => state.accounts.data);
  const categories = useSelector((state) => state.categories.data);
  const dispatch = useDispatch();

  const [initCalcDone, setInitCalcDone] = useState(false);

  useEffect(() => {
    dispatch(getTransactions());
    dispatch(getAccounts());
    dispatch(getCategories());
  }, [dispatch]);

  useEffect(() => {
    if (
      accounts?.length > 0 &&
      transactions?.length > 0 &&
      categories?.length > 0 &&
      !initCalcDone
    ) {
      const { category, account, monthly, balance } = calculateAmounts(
        accounts,
        transactions,
        categories
      );

      dispatch(
        transactionActions.setAmounts({
          monthlyExpense: monthly.debit,
          balance,
        })
      );
      setInitCalcDone(true);
    }
  }, [accounts, transactions, categories]);

  const handleOption = (selection) => {
    setSelected(selection);
  };

  const [showForm, setShowForm] = useState(false);
  const toggleShowForm = () => setShowForm((state) => !state);

  let content, form;
  if (selected == options[0]) {
    content = transactions && (
      <GroupedTransactions transactions={transactions} />
    );
    form = (
      <TransactionForm
        categories={categories}
        accounts={accounts}
        onClose={toggleShowForm}
      />
    );
  } else if (selected == options[1]) {
    content = accounts?.map((acc) => <Account key={acc._id} {...acc} />);
    form = <AccountForm onClose={toggleShowForm} />;
  } else if (selected == options[2]) {
    content = categories?.map((cat) => <Category key={cat._id} {...cat} />);
    form = <CategoryForm onClose={toggleShowForm} />;
  }

  return (
    <>
      {showForm ? (
        form
      ) : (
        <div className={styles.layout}>
          <div className={styles["fixed-layout"]}>
            <MonthlyCard
              expenses={monthlyExpense.toFixed(2)}
              balance={balance.toFixed(2)}
            />
            <OptionsBar
              options={options}
              selected={selected}
              onChange={handleOption}
            />
          </div>
          <div className={styles.content}>
            {content}
            <button className={styles.button} onClick={toggleShowForm}>
              +
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AppLayout;
