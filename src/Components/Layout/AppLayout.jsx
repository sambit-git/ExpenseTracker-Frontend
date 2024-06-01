import styles from "./AppLayout.module.css";
import OptionsBar from "./OptionsBar";
import Transaction from "../App/Transaction/Transaction";
import MonthlyCard from "./MonthlyCard";
import { useEffect, useState } from "react";

import { fetchAccounts } from "../../services/account";
import Account from "../App/Account/Account";
import { fetchCategories } from "../../services/category";
import Category from "../App/Category/Category";
import Modal from "./Modal";
import { useSelector, useDispatch } from "react-redux";
import { getTransactions } from "../../store/transactionSlice";

const AppLayout = () => {
  const options = ["Transaction", "Account", "Category"];
  const [selected, setSelected] = useState(options[0]);

  const transactions = useSelector((state) => state.transactions.data);
  const totalExpenses = useSelector((state) => state.transactions.totalExpense);
  const balance = useSelector((state) => state.transactions.balance);
  const dispatch = useDispatch();

  const [accounts, setAccounts] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (selected === options[0]) {
      dispatch(getTransactions());
    } else if (selected === options[1]) {
      fetchAccounts()
        .then((res) => setAccounts(res))
        .catch((err) => console.log(err));
    } else if (selected === options[2]) {
      fetchCategories()
        .then((res) => setCategories(res))
        .catch((err) => console.log(err));
    }
  }, [selected]);

  const handleOption = (selection) => {
    setSelected(selection);
  };
  return (
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
          accounts.map((acc) => <Account key={acc._id} {...acc} />)}
        {selected === options[2] &&
          categories.map((cat) => <Category key={cat._id} {...cat} />)}
        <button className={styles.button}> + </button>
      </div>
      <Modal />
    </div>
  );
};

export default AppLayout;
