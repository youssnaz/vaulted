import { useState, useEffect } from "react";

export default function FilterDialog({
  isOpen,
  onClose,
  activeFilters,
  setActiveFilters,
}) {

  const [selectedFilters, setSelectedFilters] =
    useState(activeFilters);

  useEffect(() => {
    setSelectedFilters(activeFilters);
  }, [activeFilters]);

  if (!isOpen) return null;

  function toggleFilter(filter) {

    if (selectedFilters.includes(filter)) {

      setSelectedFilters(
        selectedFilters.filter(
          (item) => item !== filter
        )
      );

    } else {

      setSelectedFilters([
        ...selectedFilters,
        filter,
      ]);

    }

  }

  function applyFilters() {

    setActiveFilters(selectedFilters);

    onClose();

  }

  function clearFilters() {

    setSelectedFilters([]);

    setActiveFilters([]);

    onClose();

  }

  return (

    <div className="delete-overlay">

      <div className="dialog">

       <h3 className="dialog-title">
  Filter Portfolio
</h3>

<p className="dialog-subtitle">
  Select one or more asset categories.
</p>

        <div className="dialog-body filter-options">

          {["Silver", "Gold", "Misc"].map((option) => (

            <button
              key={option}
              className={
                selectedFilters.includes(option)
                  ? "filter-button-active"
                  : "filter-button"
              }
              onClick={() => toggleFilter(option)}
            >
              {selectedFilters.includes(option)
                ? "✓ "
                : ""}
              {option}
            </button>

          ))}

        </div>

        <div className="delete-actions">

          <button
            className="cancel-button"
            onClick={clearFilters}
          >
            Clear Filter
          </button>

          <button
            className="cancel-button"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            className="confirm-delete-button"
            onClick={applyFilters}
          >
            Apply
          </button>

        </div>

      </div>

    </div>

  );

}