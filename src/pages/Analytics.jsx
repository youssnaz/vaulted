import Header from "../components/Header";

import {
  ChartPie,
  Scale,
  Coins,
  Package,
} from "lucide-react";

export default function Analytics({
  setPage,
  assets,
}) {

  const totalPurchase = assets.reduce(
    (sum, asset) =>
      sum +
      (Number(asset.price) || 0) *
      (Number(asset.quantity) || 0),
    0
  );

  const totalCurrent = assets.reduce(
    (sum, asset) =>
      sum +
      (Number(asset.currentValue) || 0) *
      (Number(asset.quantity) || 0),
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
          R {totalCurrent.toLocaleString()}
        </strong>

        <small
          style={{
            color: profitColor,
          }}
        >
          {profit >= 0 ? "+" : ""}
          R {profit.toLocaleString()} •{" "}
          {profitPercent.toFixed(2)}%
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