import styles from "./OptionsBar.module.css";

const OptionsBar = ({ options, selected, onChange }) => {
  const handleOption = (e) => {
    onChange(e.target.innerText);
  };
  return (
    <div className={styles.options}>
      {options.map((option, i) => (
        <button
          key={i}
          className={option === selected ? styles.active : ""}
          onClick={handleOption}
        >
          {option}
        </button>
      ))}
    </div>
  );
};

export default OptionsBar;
