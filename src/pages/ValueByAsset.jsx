import Header from "../components/Header";

import { useMarket } from "../context/MarketContext";
import { calculateCurrentValue } from "../calculations/portfolioCalculator";

export default function ValueByAsset({
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

  function totalValue(assetName) {

    return assets
      .filter(
        (item) => item.asset === assetName
      )
      .reduce((sum, item) => {

        const { totalCurrent } =
          calculateCurrentValue(
            item,
            marketData
          );

        return sum + totalCurrent;

      }, 0);

  }

  function formatRand(value) {

    return `R ${value.toLocaleString(
      undefined,
      {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }
    )}`;

  }

  return (

    <div className="analytics-screen">

      <Header
        title="Value by Asset"
        onBack={() => setPage("analytics")}
      />

      <div className="analytics-grid">

        <div className="analytics-tile holdings-tile">
          <h3>Silver</h3>
          <strong>{formatRand(totalValue("Silver"))}</strong>
        </div>

        <div className="analytics-tile holdings-tile">
          <h3>Gold</h3>
          <strong>{formatRand(totalValue("Gold"))}</strong>
        </div>

        <div className="analytics-tile holdings-tile">
          <h3>Copper</h3>
          <strong>{formatRand(totalValue("Copper"))}</strong>
        </div>

        <div className="analytics-tile holdings-tile">
          <h3>Natural Diamonds</h3>
          <strong>{formatRand(totalValue("Diamond"))}</strong>
        </div>

        <div className="analytics-tile holdings-tile">
          <h3>Lab Diamonds</h3>
          <strong>{formatRand(totalValue("Lab Diamond"))}</strong>
        </div>

        <div className="analytics-tile holdings-tile">
          <h3>Other</h3>
          <strong>{formatRand(totalValue("Other"))}</strong>
        </div>

      </div>

    </div>

  );

}