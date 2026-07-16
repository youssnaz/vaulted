import { useEffect, useState } from "react";

import Header from "../components/Header";
import PortfolioSummary from "../components/PortfolioSummary";
import PortfolioToolbar from "../components/PortfolioToolbar";
import PortfolioTable from "../components/PortfolioTable";
import DeleteDialog from "../components/DeleteDialog";
import FilterDialog from "../components/FilterDialog";
import SortDialog from "../components/SortDialog";

import { useMarket } from "../context/MarketContext";
import { calculateCurrentValue } from "../calculations/portfolioCalculator";

export default function Portfolio({
  setPage,
  assets,
  setAssets,
  setSelectedAsset,
}) {
  const [assetToDelete, setAssetToDelete] = useState(null);
  const [search, setSearch] = useState("");

  const [showFilter, setShowFilter] = useState(false);
  const [showSort, setShowSort] = useState(false);

  const [activeFilters, setActiveFilters] = useState([]);
  const [activeSort, setActiveSort] = useState("");

  const { gold, silver } = useMarket();

  const usdZar =
    Number(localStorage.getItem("usdZar")) || 0;

  const marketData = {
    gold: Number(gold) || 0,
    silver: Number(silver) || 0,
    usdZar,
  };

  const assetsWithLiveValues = assets.map((asset) => {
    const quantity = Number(asset.quantity) || 0;
    const purchase = Number(asset.price) || 0;

    const {
      current,
      totalCurrent,
    } = calculateCurrentValue(asset, marketData);

    return {
      ...asset,
      liveCurrentValue: current,
      liveTotalCurrent: totalCurrent,
      liveTotalPurchase: purchase * quantity,
    };
  });

  const portfolioPurchase =
    assetsWithLiveValues.reduce(
      (total, asset) =>
        total + asset.liveTotalPurchase,
      0
    );

  const portfolioCurrent =
    assetsWithLiveValues.reduce(
      (total, asset) =>
        total + asset.liveTotalCurrent,
      0
    );

  const portfolioProfit =
    portfolioCurrent - portfolioPurchase;

  const portfolioProfitPercent =
    portfolioPurchase > 0
      ? (portfolioProfit / portfolioPurchase) * 100
      : 0;

  const portfolioUSD =
    usdZar > 0
      ? portfolioCurrent / usdZar
      : 0;

  useEffect(() => {
    localStorage.setItem(
      "portfolioCurrent",
      portfolioCurrent
    );
  }, [portfolioCurrent]);

  const filteredAssets =
    assetsWithLiveValues.filter((asset) => {
      const text = search.toLowerCase();

      const matchesSearch =
        asset.id.toLowerCase().includes(text) ||
        asset.description.toLowerCase().includes(text) ||
        asset.asset.toLowerCase().includes(text) ||
        asset.type.toLowerCase().includes(text);

      let matchesFilter = true;

      if (activeFilters.length > 0) {
        matchesFilter = activeFilters.some((filter) => {
          if (filter === "Silver") {
            return asset.asset === "Silver";
          }

          if (filter === "Gold") {
            return asset.asset === "Gold";
          }

          if (filter === "Misc") {
            return (
              asset.asset === "Copper" ||
              asset.asset === "Diamond" ||
              asset.asset === "Lab Diamond" ||
              asset.asset === "Other"
            );
          }

          return false;
        });
      }

      return matchesSearch && matchesFilter;
    });

  filteredAssets.sort((a, b) => {
    switch (activeSort) {
      case "Date Added ↓":
        return (
          Number(b.id.slice(1)) -
          Number(a.id.slice(1))
        );

      case "Date Added ↑":
        return (
          Number(a.id.slice(1)) -
          Number(b.id.slice(1))
        );

      case "Current ↓":
        return (
          Number(b.liveCurrentValue || 0) -
          Number(a.liveCurrentValue || 0)
        );

      case "Current ↑":
        return (
          Number(a.liveCurrentValue || 0) -
          Number(b.liveCurrentValue || 0)
        );

      case "Purchase ↓":
        return (
          Number(b.price || 0) -
          Number(a.price || 0)
        );

      case "Purchase ↑":
        return (
          Number(a.price || 0) -
          Number(b.price || 0)
        );

      case "Weight ↓":
        return (
          Number(b.weight || 0) -
          Number(a.weight || 0)
        );

      case "Weight ↑":
        return (
          Number(a.weight || 0) -
          Number(b.weight || 0)
        );

      case "Profit ↓":
        return (
          Number(b.liveCurrentValue || 0) -
          Number(b.price || 0) -
          (
            Number(a.liveCurrentValue || 0) -
            Number(a.price || 0)
          )
        );

      case "Profit ↑":
        return (
          Number(a.liveCurrentValue || 0) -
          Number(a.price || 0) -
          (
            Number(b.liveCurrentValue || 0) -
            Number(b.price || 0)
          )
        );

      case "Quantity ↓":
        return (
          Number(b.quantity || 0) -
          Number(a.quantity || 0)
        );

      case "Quantity ↑":
        return (
          Number(a.quantity || 0) -
          Number(b.quantity || 0)
        );

      case "Asset A-Z":
        return a.asset.localeCompare(b.asset);

      case "Asset Z-A":
        return b.asset.localeCompare(a.asset);

      default:
        return 0;
    }
  });

  function confirmDelete() {
    setAssets(
      assets.filter(
        (asset) => asset.id !== assetToDelete.id
      )
    );

    setAssetToDelete(null);
  }

  function handleRowClick(asset) {
    setSelectedAsset(asset);
    setPage("details");
  }

  function clearSort() {
    setActiveSort("");
  }
    function clearFilters() {
    setActiveFilters([]);
  }

  return (
    <div className="portfolio-screen">

      <Header
        title="Portfolio"
        onBack={() => setPage("home")}
      />

      <PortfolioSummary
        assets={assetsWithLiveValues}
        portfolioCurrent={portfolioCurrent}
        portfolioProfit={portfolioProfit}
        portfolioProfitPercent={portfolioProfitPercent}
        portfolioUSD={portfolioUSD}
      />

      <PortfolioToolbar
        search={search}
        setSearch={setSearch}
        onFilterClick={() => setShowFilter(true)}
        onSortClick={() => setShowSort(true)}
        activeFilters={activeFilters}
        setActiveFilters={setActiveFilters}
        activeSort={activeSort}
        clearSort={clearSort}
      />

      <PortfolioTable
        assets={filteredAssets}
        handleRowClick={handleRowClick}
        setAssetToDelete={setAssetToDelete}
      />

      <DeleteDialog
        assetToDelete={assetToDelete}
        setAssetToDelete={setAssetToDelete}
        confirmDelete={confirmDelete}
      />

      <FilterDialog
        isOpen={showFilter}
        onClose={() => setShowFilter(false)}
        activeFilters={activeFilters}
        setActiveFilters={setActiveFilters}
      />

      <SortDialog
        isOpen={showSort}
        onClose={() => setShowSort(false)}
        activeSort={activeSort}
        setActiveSort={setActiveSort}
      />

    </div>
  );
}