/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { FaChevronDown } from "react-icons/fa";
const SelectBox = ({ options, value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    console.log(isOpen);
  }, [isOpen]);
  const selectOption = (o) => {
    onChange(o);
  };
  return (
    <div
      className="select-main"
      tabIndex={0}
      onBlur={() => {
        setIsOpen(false);
      }}
      onClick={() => setIsOpen((prev) => !prev)}
    >
      <span className="select-value">{value}</span>
      <div className="select-caret">
        <FaChevronDown />
      </div>
      <ul className={isOpen ? "select-options show" : "select-options"}>
        {options.map((option, index) => {
          return (
            <li
              key={index}
              className={`select-option
                ${option.value === value ? "selected" : ""}
              `}
              value={option.value}
              onClick={(e) => {
                e.stopPropagation();
                selectOption(option.value);
                setIsOpen(false);
              }}
            >
              {option.label}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
export default SelectBox;
