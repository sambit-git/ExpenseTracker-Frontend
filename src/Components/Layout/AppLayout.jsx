// Hooks
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

// styles
import styles from "./AppLayout.module.css";

// components
import OptionsBar from "./OptionsBar";
import Transaction from "../App/Transaction/Transaction";
import MonthlyCard from "./MonthlyCard";
import Account from "../App/Account/Account";
import Category from "../App/Category/Category";

import TransactionForm from "../App/Transaction/TransactionForm";

// Action Creators - Thunks
import { getTransactions } from "../../store/transactionSlice";
import { getAccounts } from "../../store/accountSlice";
import { getCategories } from "../../store/categorySlice";

const AppLayout = () => {
  const options = ["Transaction", "Account", "Category"];
  const [selected, setSelected] = useState(options[0]);

  const transactions = useSelector((state) => state.transactions.data);
  const totalExpenses = useSelector((state) => state.transactions.totalExpense);
  const balance = useSelector((state) => state.transactions.balance);
  const accounts = useSelector((state) => state.accounts.data);
  const categories = useSelector((state) => state.categories.data);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTransactions());
    dispatch(getAccounts());
    dispatch(getCategories());
  }, []);

  const handleOption = (selection) => {
    setSelected(selection);
  };

  const [showForm, setShowForm] = useState(false);
  const toggleShowForm = () => setShowForm((state) => !state);

  return (
    <>
      {showForm ? (
        <TransactionForm
          categories={categories}
          accounts={accounts}
          onClose={toggleShowForm}
        />
      ) : (
        <div className={styles.layout}>
          <div className={styles["fixed-layout"]}>
            <MonthlyCard expenses={totalExpenses} balance={balance} />
            <OptionsBar
              options={options}
              selected={selected}
              onChange={handleOption}
            />
          </div>
          <div className={styles.content}>
            {selected === options[0] &&
              transactions?.map((tx) => <Transaction key={tx._id} {...tx} />)}
            {selected === options[1] &&
              accounts?.map((acc) => <Account key={acc._id} {...acc} />)}
            {selected === options[2] &&
              categories?.map((cat) => <Category key={cat._id} {...cat} />)}
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
