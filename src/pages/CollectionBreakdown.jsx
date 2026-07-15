import Header from "../components/Header";

export default function CollectionBreakdown({
  setPage,
  assets,
}) {

  const grouped = {};

  assets.forEach((asset) => {

    const assetName =
      asset.asset || "Other";

    const type =
      asset.type || "Other";

    const quantity =
      Number(asset.quantity) || 0;

    if (!grouped[assetName]) {

      grouped[assetName] = {
        total: 0,
        items: {},
      };

    }

    grouped[assetName].total += quantity;

    grouped[assetName].items[type] =
      (grouped[assetName].items[type] || 0) +
      quantity;

  });

  const assetOrder = [
    "Silver",
    "Gold",
    "Diamond",
    "Lab Diamond",
    "Copper",
    "Other",
  ];

  return (

    <div className="analytics-screen">

      <Header
        title="Collection Breakdown"
        onBack={() =>
          setPage("analytics")
        }
      />

      {assetOrder
        .filter(asset => grouped[asset])
        .map(assetName => (

          <div
            className="breakdown-section"
            key={assetName}
          >

            <div className="breakdown-header">

              <h2>{assetName}</h2>

              <span>
                {grouped[assetName].total} Items
              </span>

            </div>

            <div className="breakdown-grid">

              {Object.entries(
                grouped[assetName].items
              ).map(([type, amount]) => (

                <div
                  className="breakdown-chip"
                  key={type}
                >

                  <div className="breakdown-chip-type">
                    {type}
                  </div>

                  <div className="breakdown-chip-number">
                    {amount}
                  </div>

                </div>

              ))}

            </div>

          </div>

        ))}

    </div>

  );

}