import { useEffect, useState } from "react";
import { useMarket } from "../context/MarketContext";
import Header from "../components/Header";

export default function Market({ setPage }) {

  const {
  gold,
  silver,
  lastUpdated,
  loading,
  refreshMarketData,
} = useMarket();

 const silverSpot = Number(silver) || 0;

  const goldSpot = Number(gold) || 0;

  const [usdZar, setUsdZar] = useState(
    () => localStorage.getItem("usdZar") || ""
  );

  useEffect(() => {

    localStorage.setItem(
      "silverSpot",
      silverSpot
    );

  }, [silverSpot]);

  useEffect(() => {

    localStorage.setItem(
      "goldSpot",
      goldSpot
    );

  }, [goldSpot]);

  useEffect(() => {

    localStorage.setItem(
      "usdZar",
      usdZar
    );

  }, [usdZar]);

  const OUNCE_IN_GRAMS = 31.1034768;

  const silverOzUSD =
    Number(silverSpot) || 0;

  const goldOzUSD =
    Number(goldSpot) || 0;

  const exchangeRate =
    Number(usdZar) || 0;

  const silverGramUSD =
    silverOzUSD / OUNCE_IN_GRAMS;

  const silverGramZAR =
    silverGramUSD * exchangeRate;

  const silverOzZAR =
    silverOzUSD * exchangeRate;

  const silverKgUSD =
    silverGramUSD * 1000;

  const silverKgZAR =
    silverGramZAR * 1000;

  const goldGramUSD =
    goldOzUSD / OUNCE_IN_GRAMS;

  const goldGramZAR =
    goldGramUSD * exchangeRate;

  const goldOzZAR =
    goldOzUSD * exchangeRate;

  const goldKgUSD =
    goldGramUSD * 1000;

  const goldKgZAR =
    goldGramZAR * 1000;

  function formatUSD(value) {

    return value.toLocaleString(
      undefined,
      {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }
    );

  }

  function formatZAR(value) {

    return value.toLocaleString(
      undefined,
      {
        style: "currency",
        currency: "ZAR",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }
    );

  }

  return (

    <div className="market-screen">

      <Header
        title="Market"
        onBack={() => setPage("home")}
      />

      <div className="market-inputs">

        <div className="market-input-card">

          <label>
            Silver Spot (USD/oz)
          </label>

          <div className="market-live-value">
  ${silverSpot.toFixed(2)}
</div>

        </div>

        <div className="market-input-card">

          <label>
            Gold Spot (USD/oz)
          </label>
<div className="market-live-value">
  ${goldSpot.toFixed(2)}
</div>

        </div>

        <div className="market-input-card">

          <label>
            USD / ZAR
          </label>

          <input
            type="number"
            placeholder="0.00"
            value={usdZar}
            onChange={(event) =>
              setUsdZar(event.target.value)
            }
          />

        </div>

      </div>

      <div className="market-metals">

        <div className="metal-card">

          <h2>Silver</h2>

          <div className="metal-value-row">

            <span>Per gram</span>

            <div>

              <strong>
                {formatUSD(silverGramUSD)}
              </strong>

              <small>
                {formatZAR(silverGramZAR)}
              </small>

            </div>

          </div>

          <div className="metal-value-row">

            <span>1 oz</span>

            <div>

              <strong>
                {formatUSD(silverOzUSD)}
              </strong>

              <small>
                {formatZAR(silverOzZAR)}
              </small>

            </div>

          </div>

          <div className="metal-value-row">

            <span>1 kg</span>

            <div>

              <strong>
                {formatUSD(silverKgUSD)}
              </strong>

              <small>
                {formatZAR(silverKgZAR)}
              </small>

            </div>

          </div>

        </div>

        <div className="metal-card">

          <h2>Gold</h2>

          <div className="metal-value-row">

            <span>Per gram</span>

            <div>

              <strong>
                {formatUSD(goldGramUSD)}
              </strong>

              <small>
                {formatZAR(goldGramZAR)}
              </small>

            </div>

          </div>

          <div className="metal-value-row">

            <span>1 oz</span>

            <div>

              <strong>
                {formatUSD(goldOzUSD)}
              </strong>

              <small>
                {formatZAR(goldOzZAR)}
              </small>

            </div>

          </div>

          <div className="metal-value-row">

            <span>1 kg</span>

            <div>

              <strong>
                {formatUSD(goldKgUSD)}
              </strong>

              <small>
                {formatZAR(goldKgZAR)}
              </small>

            </div>

          </div>

        </div>

      </div>

      <div className="market-footer">

        <div className="market-update-card">

          <small>Last Updated</small>

          <strong>
            {lastUpdated
              ? new Date(lastUpdated).toLocaleString()
              : "Never"}
          </strong>

        </div>

        <div className="market-buttons">

          <button
            className="market-refresh-button"
            onClick={refreshMarketData}
            disabled={loading}
          >
            {loading
              ? "Refreshing..."
              : "🔄 Refresh Metals"}
          </button>

          <button
            className="market-disabled-button"
            disabled
          >
            💱 Currency Soon
          </button>

        </div>

      </div>

    </div>

  );

}