import Header from "../components/Header";
import { useMarket } from "../context/MarketContext";
import { calculateCurrentValue } from "../calculations/portfolioCalculator";

export default function AssetDetails({
  setPage,
  selectedAsset,
}) {
  const { gold, silver } = useMarket();

  const usdZar =
    Number(localStorage.getItem("usdZar")) || 0;

  if (!selectedAsset) {
    return (
      <div className="page-screen">
        <Header
          title="Asset Details"
          onBack={() => setPage("portfolio")}
        />

        <div className="asset-details-empty">
          <p>No asset selected.</p>
        </div>
      </div>
    );
  }

  const marketData = {
    gold: Number(gold) || 0,
    silver: Number(silver) || 0,
    usdZar,
  };

  const quantity =
    Number(selectedAsset.quantity) || 0;

  const weight =
    Number(selectedAsset.weight) || 0;

  const purchasePrice =
    Number(selectedAsset.price) || 0;

  const {
    current: currentPrice,
    totalCurrent,
  } = calculateCurrentValue(
    selectedAsset,
    marketData
  );

  const totalPurchase =
    purchasePrice * quantity;

  const profit =
    totalCurrent - totalPurchase;

  const profitPercent =
    totalPurchase > 0
      ? (profit / totalPurchase) * 100
      : 0;

  const isDiamond =
    selectedAsset.asset === "Diamond" ||
    selectedAsset.asset === "Lab Diamond";

  const isMetal =
    selectedAsset.asset === "Silver" ||
    selectedAsset.asset === "Gold" ||
    selectedAsset.asset === "Copper";

  const purityNumber =
    parseFloat(selectedAsset.purity) || 0;

  const pureWeight =
    weight * (purityNumber / 100);

  const profitColor =
    profit > 0
      ? "#43d17d"
      : profit < 0
      ? "#ff5f5f"
      : "#f5f5f7";

  function handleEdit() {
    setPage("add");
  }

  function formatMoney(value) {
    return `R ${Number(value || 0).toLocaleString(
      undefined,
      {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }
    )}`;
  }
    return (

    <div className="asset-details-screen">

      <Header
        title="Asset Details"
        onBack={() => setPage("portfolio")}
      />

      <div className="asset-details-card">

        <div className="asset-details-heading">

          <p className="asset-details-id">
            {selectedAsset.id}
          </p>

          <h1 className="asset-details-title">
            {selectedAsset.description || "Unnamed Asset"}
          </h1>

          <span
            className={`asset-badge asset-badge-${selectedAsset.asset
              .toLowerCase()
              .replace(" ", "-")}`}
          >
            {selectedAsset.asset}
          </span>

        </div>

        <div className="asset-details-section">

          <div className="asset-detail-row">

            <span>Type</span>

            <strong>{selectedAsset.type}</strong>

          </div>

          <div className="asset-detail-row">

            <span>Quantity</span>

            <strong>{quantity}</strong>

          </div>

          {isMetal && (

            <div className="asset-detail-row">

              <span>Purity</span>

              <strong>{selectedAsset.purity}</strong>

            </div>

          )}

          {isMetal && (

            <div className="asset-detail-row">

              <span>
                Pure {selectedAsset.asset}
              </span>

              <strong>

                {pureWeight.toLocaleString(
                  undefined,
                  {
                    minimumFractionDigits:2,
                    maximumFractionDigits:4,
                  }
                )} g

              </strong>

            </div>

          )}

          <div className="asset-detail-row">

            <span>Weight</span>

            <strong>

              {weight}

              {isDiamond ? " ct" : " g"}

            </strong>

          </div>

          <div className="asset-detail-row">

            <span>Purchase Price (1)</span>

            <strong>

              {formatMoney(purchasePrice)}

            </strong>

          </div>

          <div className="asset-detail-row">

            <span>Current Price (1)</span>

            <strong>

              {formatMoney(currentPrice)}

            </strong>

          </div>

          <div className="asset-detail-row">

            <span>Total Purchase</span>

            <strong>

              {formatMoney(totalPurchase)}

            </strong>

          </div>
                  <div className="asset-detail-row">

          <span>Total Current</span>

          <strong>

            {formatMoney(totalCurrent)}

          </strong>

        </div>

        <div className="asset-detail-row">

          <span>Profit / Loss</span>

          <div className="asset-profit-value">

            <strong
              style={{
                color: profitColor,
              }}
            >
              {profit > 0 ? "+" : ""}
              {formatMoney(profit)}
            </strong>

            <small
              style={{
                color: profitColor,
              }}
            >
              {profit > 0 ? "+" : ""}
              {profitPercent.toFixed(2)}%
            </small>

          </div>

        </div>

      </div>

    </div>

      <button
        className="save-button"
        onClick={handleEdit}
      >
        Edit Asset
      </button>

    </div>

  );

}