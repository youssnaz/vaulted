import {
  Plus,
  Vault,
  ChartPie,
  LineChart,
  Settings2,
} from "lucide-react";

import { useMarket } from "../context/MarketContext";

export default function Home({
  setPage,
  setSelectedAsset,
}) {
  const { gold, silver, loading } = useMarket();

  const portfolio =
    Number(localStorage.getItem("portfolioCurrent")) || 0;

  function formatPortfolio(value) {
    if (value >= 1000000) {
      const millions = value / 1000000;

      return `R${millions.toFixed(
        millions >= 10 ? 0 : 1
      )}M`;
    }

    if (value >= 1000) {
      return `R${(value / 1000).toFixed(1)}K`;
    }

    return `R${value.toLocaleString()}`;
  }

  return (
    <div className="home-screen">
      <div className="brand">
        <p className="eyebrow">
          PERSONAL ASSET MANAGER
        </p>

        <h1>VAULTED</h1>
      </div>

      <div className="home-widgets">
        <div className="spot-row">
          <div className="spot-widget">
            <div className="spot-title">
              <span className="spot-dot silver-dot" />
              <small>Silver</small>
            </div>

            <strong>
              {loading
                ? "Loading..."
                : `$${Number(silver).toFixed(2)}`}
            </strong>
          </div>

          <div className="spot-widget">
            <div className="spot-title">
              <span className="spot-dot gold-dot" />
              <small>Gold</small>
            </div>

            <strong>
              {loading
                ? "Loading..."
                : `$${Number(gold).toFixed(2)}`}
            </strong>
          </div>
        </div>
      </div>

      <div className="home-actions">
        <button
          className="action-card"
          onClick={() => {
            setSelectedAsset(null);
            setPage("add");
          }}
        >
          <div className="home-icon">
            <Plus />
          </div>

          <div className="button-copy">
            <strong>Add</strong>
          </div>
        </button>

        <button
          className="action-card"
          onClick={() => setPage("portfolio")}
        >
          <div className="home-icon">
            <Vault />
          </div>

          <div className="button-copy">
            <strong>Portfolio</strong>
          </div>
        </button>

        <button
          className="action-card"
          onClick={() => setPage("market")}
        >
          <div className="home-icon">
            <LineChart />
          </div>

          <div className="button-copy">
            <strong>Market</strong>
          </div>
        </button>

        <button
          className="action-card"
          onClick={() => setPage("analytics")}
        >
          <div className="home-icon">
            <ChartPie />
          </div>

          <div className="button-copy">
            <strong>Analytics</strong>
          </div>
        </button>
      </div>

      <button
        className="settings-button"
        onClick={() => setPage("data")}
      >
        <Settings2 size={18} />
      </button>
    </div>
  );
}