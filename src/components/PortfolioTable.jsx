export default function PortfolioTable({
  assets,
  handleRowClick,
  setAssetToDelete,
}) {

  if (assets.length === 0) {

    return (

      <div className="portfolio-empty">

        <div className="empty-icon">
          📦
        </div>

        <h2>No Assets Yet</h2>

        <p>
          Add your first asset to start building your vault.
        </p>

      </div>

    );

  }

  return (

    <div className="portfolio-table">

      <div className="portfolio-header">

        <span>ID</span>
        <span>Description</span>
        <span>Asset</span>
        <span>Type</span>
        <span>Qty</span>
        <span>Weight</span>
        <span>Purchase</span>
        <span>Current</span>
        <span>Total Purchase</span>
        <span>Total Current</span>
        <span></span>

      </div>

      {assets.map((asset) => {

        const qty = Number(asset.quantity) || 0;

        const purchase =
          Number(asset.price) || 0;

        const current =
          Number(asset.liveCurrentValue) || 0;

        const totalPurchase =
          Number(asset.liveTotalPurchase) || 0;

        const totalCurrent =
          Number(asset.liveTotalCurrent) || 0;

        return (

          <div
            key={asset.id}
            className="portfolio-row"
            onClick={() => handleRowClick(asset)}
          >

            <span>{asset.id}</span>

            <span>{asset.description}</span>

            <span>{asset.asset}</span>

            <span>{asset.type}</span>

            <span>{qty}</span>

            <span>

              {asset.weight}

              {asset.asset === "Diamond" ||
              asset.asset === "Lab Diamond"
                ? " ct"
                : " g"}

            </span>

            <span>

              R {purchase.toLocaleString(undefined,{
                minimumFractionDigits:2,
                maximumFractionDigits:2,
              })}

            </span>

            <span>

              {current > 0
                ? `R ${current.toLocaleString(undefined,{
                    minimumFractionDigits:2,
                    maximumFractionDigits:2,
                  })}`
                : "-"}

            </span>

            <span>

              R {totalPurchase.toLocaleString(undefined,{
                minimumFractionDigits:2,
                maximumFractionDigits:2,
              })}

            </span>

            <span>

              {totalCurrent > 0
                ? `R ${totalCurrent.toLocaleString(undefined,{
                    minimumFractionDigits:2,
                    maximumFractionDigits:2,
                  })}`
                : "-"}

            </span>

            <button
              className="delete-button"
              onClick={(e) => {

                e.stopPropagation();

                setAssetToDelete(asset);

              }}
            >
              🗑
            </button>

          </div>

        );

      })}

    </div>

  );

}