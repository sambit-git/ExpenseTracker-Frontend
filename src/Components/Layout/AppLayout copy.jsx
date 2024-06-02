// Hooks
import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

// styles
import styles from "./AppLayout.module.css";

// components
import OptionsBar from "./OptionsBar";
import Transaction from "../App/Transaction/Transaction";
import MonthlyCard from "./MonthlyCard";
import Account from "../App/Account/Account";
import Category from "../App/Category/Category";
import Modal from "./Modal";

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

  const modalRef = useRef();
  const [showModal, setShowModal] = useState(false);
  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);
  if (showModal) modalRef.current.open();
  // if (modalRef && !showModal) modalRef.current.close();

  useEffect(() => {
    dispatch(getTransactions());
    dispatch(getAccounts());
    dispatch(getCategories());
  }, []);

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
          accounts?.map((acc) => <Account key={acc._id} {...acc} />)}
        {selected === options[2] &&
          categories?.map((cat) => <Category key={cat._id} {...cat} />)}
        <button className={styles.button} onClick={openModal}>
          +
        </button>
      </div>
    </div>
  );
};

export default AppLayout;
