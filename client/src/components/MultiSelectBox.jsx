import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { MdClose } from "react-icons/md";
const MultiSelectBox = ({
  customWidth,
  multiple,
  options,
  value,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectOption = (option) => {
    if (multiple) {
      if (value.some((v) => v === option.value)) {
        onChange(value.filter((v) => v !== option.value));
      } else {
        onChange([...value, option.value]);
      }
    } else {
      if (option.value !== value.value) onChange(option);
    }
  };
  function isSelected(option) {
    return multiple
      ? value.some((v) => v === option.value)
      : option.value === value.value;
  }
  return (
    <div
      className="select-main"
      tabIndex={0}
      onBlur={() => {
        setIsOpen(false);
      }}
      onClick={() => setIsOpen((prev) => !prev)}
      style={customWidth ? { width: "100%" } : {}}
    >
      <span className="select-value">
        {multiple
          ? value.map((v, i) => (
              <button
                key={i}
                className="select-badge"
                onClick={(e) => {
                  e.stopPropagation();
                  selectOption({ value: v });
                }}
              >
                {v}
                <span className="select-remove">
                  <MdClose />
                </span>
              </button>
            ))
          : value.label}
      </span>
      <div className="select-caret">
        <FaChevronDown />
      </div>
      <ul className={isOpen ? "select-options show" : "select-options"}>
        {options.map((option, index) => {
          return (
            <li
              key={index}
              className={`select-option
                ${isSelected(option) ? "selected" : ""}
              `}
              value={option.value}
              onClick={(e) => {
                e.stopPropagation();
                selectOption(option);
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
export default MultiSelectBox;
