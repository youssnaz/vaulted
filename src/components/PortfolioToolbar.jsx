export default function PortfolioToolbar({
  search,
  setSearch,
  onFilterClick,
  onSortClick,
  activeFilters,
  setActiveFilters,
  activeSort,
  clearSort,
}) {

  function removeFilter(filter) {

    setActiveFilters(
      activeFilters.filter(
        (item) => item !== filter
      )
    );

  }

  return (

    <div className="portfolio-toolbar">

      <input
        className="portfolio-search"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="toolbar-buttons">

        {activeFilters.map((filter) => (

          <button
            key={filter}
            className="active-filter-chip"
            onClick={onFilterClick}
          >
            {filter}

            <span
              className="filter-close"
              onClick={(e) => {

                e.stopPropagation();

                removeFilter(filter);

              }}
            >
              ✕
            </span>

          </button>

        ))}

        {activeSort && (

          <button
            className="active-filter-chip"
            onClick={onSortClick}
          >
            {activeSort}

            <span
              className="filter-close"
              onClick={(e) => {

                e.stopPropagation();

                clearSort();

              }}
            >
              ✕
            </span>

          </button>

        )}

        <button
          className="toolbar-button"
          onClick={onFilterClick}
        >
          Filter
        </button>

        <button
          className="toolbar-button"
          onClick={onSortClick}
        >
          Sort
        </button>

      </div>

    </div>

  );

}