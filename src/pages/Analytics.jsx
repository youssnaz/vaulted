import Header from "../components/Header";

import {
  ChartPie,
  Scale,
  Coins,
  Package,
} from "lucide-react";

import { useMarket } from "../context/MarketContext";
import { calculateCurrentValue } from "../calculations/portfolioCalculator";

export default function Analytics({
  setPage,
  assets,
}) {

  const { gold, silver } = useMarket();

  const usdZar =
    Number(localStorage.getItem("usdZar")) || 0;

  const marketData = {
    gold: Number(gold) || 0,
    silver: Number(silver) || 0,
    usdZar,
  };

  const assetsWithLiveValues = assets.map((asset) => {

    const purchase =
      (Number(asset.price) || 0) *
      (Number(asset.quantity) || 0);

    const {
      totalCurrent,
    } = calculateCurrentValue(
      asset,
      marketData
    );

    return {
      purchase,
      current: totalCurrent,
    };

  });

  const totalPurchase =
    assetsWithLiveValues.reduce(
      (sum, asset) => sum + asset.purchase,
      0
    );

  const totalCurrent =
    assetsWithLiveValues.reduce(
      (sum, asset) => sum + asset.current,
      0
    );

  const profit =
    totalCurrent - totalPurchase;

  const profitPercent =
    totalPurchase > 0
      ? (profit / totalPurchase) * 100
      : 0;

  const profitColor =
    profit >= 0
      ? "#43d17d"
      : "#ff5f5f";

  return (

    <div className="analytics-screen">

      <Header
        title="Analytics"
        onBack={() => setPage("home")}
      />

      <div className="analytics-card">

        <h2>Portfolio Value</h2>

        <strong>
          R {totalCurrent.toLocaleString(
            undefined,
            {
              minimumFractionDigits:2,
              maximumFractionDigits:2,
            }
          )}
        </strong>

        <small
          style={{
            color: profitColor,
          }}
        >
          {profit >= 0 ? "+" : ""}
          R {profit.toLocaleString(
            undefined,
            {
              minimumFractionDigits:2,
              maximumFractionDigits:2,
            }
          )} • {profitPercent.toFixed(2)}%
        </small>

      </div>

      <div className="analytics-grid">

        <div
          className="analytics-tile"
          onClick={() => setPage("holdings")}
        >

          <Scale
            size={34}
            className="analytics-icon"
          />

          <h3>Holdings</h3>

        </div>

        <div
          className="analytics-tile"
          onClick={() =>
            setPage("valueByAsset")
          }
        >

          <Coins
            size={34}
            className="analytics-icon"
          />

          <h3>Value by Asset</h3>

        </div>

        <div
          className="analytics-tile"
          onClick={() =>
            setPage("assetAllocation")
          }
        >

          <ChartPie
            size={34}
            className="analytics-icon"
          />

          <h3>Asset Allocation</h3>

        </div>

        <div
          className="analytics-tile"
          onClick={() =>
            setPage("collectionBreakdown")
          }
        >

          <Package
            size={34}
            className="analytics-icon"
          />

          <h3>Collection Breakdown</h3>

        </div>

      </div>

    </div>

  );

}