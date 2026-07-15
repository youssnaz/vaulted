export default function PortfolioSummary({
  assets,
  portfolioCurrent,
  portfolioProfit,
  portfolioProfitPercent,
  portfolioUSD,
}) {

  const profitColor =
    portfolioProfit > 0
      ? "#43d17d"
      : portfolioProfit < 0
      ? "#ff5f5f"
      : "white";

  return (

    <div className="portfolio-summary">

      <div className="summary-card">

        <small>Assets</small>

        <strong>{assets.length}</strong>

        <small className="summary-subtitle">
          Total Assets
        </small>

      </div>

      <div className="summary-card">

        <small>Portfolio (USD)</small>

        <strong>
          ${portfolioUSD.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </strong>

      </div>

      <div className="summary-card">

        <small>Portfolio (ZAR)</small>

        <strong>
          R {portfolioCurrent.toLocaleString()}
        </strong>

      </div>

      <div className="summary-card">

        <small>Profit / Loss</small>

        <strong
          style={{
            color: profitColor,
          }}
        >
          {portfolioProfit > 0 ? "+" : ""}
          R {portfolioProfit.toLocaleString()}
        </strong>

        <small
          className="summary-subtitle"
          style={{
            color: profitColor,
          }}
        >
          {portfolioProfit > 0 ? "+" : ""}
          {portfolioProfitPercent.toFixed(2)}%
        </small>

      </div>

    </div>

  );

}