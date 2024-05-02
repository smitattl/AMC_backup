import React, { useState } from "react";
import styles from "./CheckboxSelect.module.css";

const DropdownWithCheckbox = ({ options, onCheckboxChange }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectAll, setSelectAll] = useState(false);

  const handleRadioChange = (option) => {
    setSelectedOptions(option);
  };
  const handleCheckboxChange = (option) => {
    const updatedSelection = [...selectedOptions];
    if (updatedSelection.includes(option)) {
      updatedSelection.splice(updatedSelection.indexOf(option), 1);
    } else {
      updatedSelection.push(option);
    }
    setSelectedOptions(updatedSelection);
  };

  const handleSelectAllChange = () => {
    if (!selectAll) {
      setSelectedOptions(options);
    } else {
      setSelectedOptions([]);
    }
    setSelectAll(!selectAll);
  };

  const handleSubmit = (e) => {
    if (selectedOptions.length === 0) {
      e.preventDefault();
    } else onCheckboxChange(selectedOptions);
  };

  return (
    <div className={styles.container}>
      {options.map((option) => (
        <div className="d-flex gap-2">
          <input
            type="radio"
            className="form-check-label"
            value={option}
            checked={selectedOptions === option} // Use selectedOption instead of selectedOptions
            onChange={() => handleRadioChange(option)} // Change the handler function to handle radio buttons
            name="radioGroup"
          />
          <label className={styles.CheckboxLable} key={option}>
            {option}
          </label>
        </div>
      ))}

      <div className="d-flex justify-content-between gap-4 align-items-center mt-5">
        <span className="text-danger" style={{ fontWeight: 600 }}>
          Note: Kindly use Mobile number and PAN card provided at the time of
          Vehicle purchase
        </span>
        <button
          className={styles.button}
          onClick={handleSubmit}
          disabled={selectedOptions.length === 0}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default DropdownWithCheckbox;
