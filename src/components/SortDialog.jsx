import { useState, useEffect } from "react";

export default function SortDialog({
  isOpen,
  onClose,
  activeSort,
  setActiveSort,
}) {

  const [selectedSort, setSelectedSort] =
    useState(activeSort);

  useEffect(() => {
    setSelectedSort(activeSort);
  }, [activeSort]);

  if (!isOpen) return null;

  const sortOptions = [

  "Date Added ↓",
  "Date Added ↑",

  "Current ↓",
  "Current ↑",

  "Purchase ↓",
  "Purchase ↑",

  "Profit ↓",
  "Profit ↑",

  "Weight ↓",
  "Weight ↑",

  "Quantity ↓",
  "Quantity ↑",

  "Asset A-Z",
  "Asset Z-A",

];

  function applySort() {

    setActiveSort(selectedSort);

    onClose();

  }

  function clearSort() {

    setSelectedSort("");

    setActiveSort("");

    onClose();

  }

  return (

    <div className="delete-overlay">

      <div className="dialog">

        <h3>Sort Portfolio</h3>

        <p
          style={{
            marginBottom: "18px",
            color: "#8f949d",
          }}
        >
          Select one sorting method.
        </p>

        <div
  className="dialog-body filter-options"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >

          {sortOptions.map((option) => (

            <button
              key={option}
              className={
                selectedSort === option
                  ? "filter-button-active"
                  : "filter-button"
              }
              onClick={() =>
                setSelectedSort(option)
              }
            >
              {selectedSort === option ? "✓ " : ""}
              {option}
            </button>

          ))}

        </div>

<div className="delete-actions">

  <button
    className="cancel-button"
    onClick={onClose}
  >
    Cancel
  </button>

  <button
    className="cancel-button"
    onClick={clearSort}
  >
    Clear
  </button>

  <button
    className="confirm-delete-button"
    onClick={applySort}
  >
    Apply
  </button>

</div>

      </div>

    </div>

  );

}