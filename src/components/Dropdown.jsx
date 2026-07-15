import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function Dropdown({
  label,
  value,
  options = [],
  onChange,
}) {
  const [open, setOpen] = useState(false);

  function handleSelect(option) {
    console.log("Selected:", option);
    onChange(option);
    setOpen(false);
  }

  return (
    <div className="dropdown-field">

      <label>{label}</label>

      <button
        className="dropdown-button"
        type="button"
        onClick={() => {
          console.log("Button clicked");
          setOpen(!open);
        }}
      >
        <span>{value}</span>

        <ChevronDown
          size={20}
          className={open ? "rotate" : ""}
        />
      </button>

      {open && (
        <div className="dropdown-menu">

          {options.map((option) => (
            <button
              key={option}
              className="dropdown-option"
              type="button"
              onClick={() => handleSelect(option)}
            >
              {option}
            </button>
          ))}

        </div>
      )}

    </div>
  );
}