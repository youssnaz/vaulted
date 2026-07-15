import Header from "../components/Header";

export default function Holdings({
  setPage,
  assets,
}) {

  function getPurityMultiplier(purity) {

    const purityNumber =
      parseFloat(purity);

    return Number.isFinite(purityNumber)
      ? purityNumber / 100
      : 0;

  }

  function calculateMetal(assetName) {

    return assets
      .filter((item) => item.asset === assetName)
      .reduce(
        (totals, item) => {

          const quantity =
            Number(item.quantity) || 0;

          const weight =
            Number(item.weight) || 0;

          const totalWeight =
            weight * quantity;

          const pureWeight =
            totalWeight *
            getPurityMultiplier(item.purity);

          return {
            total:
              totals.total + totalWeight,

            pure:
              totals.pure + pureWeight,
          };

        },
        {
          total: 0,
          pure: 0,
        }
      );

  }

  function calculateCarats(assetName) {

    return assets
      .filter((item) => item.asset === assetName)
      .reduce(
        (total, item) =>
          total +
          (Number(item.weight) || 0) *
          (Number(item.quantity) || 0),
        0
      );

  }

  function formatMetalWeight(grams) {

    if (grams >= 1000) {

      return `${(grams / 1000).toLocaleString(
        undefined,
        {
          minimumFractionDigits: 2,
          maximumFractionDigits: 3,
        }
      )} kg`;

    }

    return `${grams.toLocaleString(
      undefined,
      {
        minimumFractionDigits: 2,
        maximumFractionDigits: 3,
      }
    )} g`;

  }

  const silver =
    calculateMetal("Silver");

  const gold =
    calculateMetal("Gold");

  const copper =
    calculateMetal("Copper");

  const naturalDiamonds =
    calculateCarats("Diamond");

  const labDiamonds =
    calculateCarats("Lab Diamond");

  return (

    <div className="analytics-screen">

      <Header
        title="Holdings"
        onBack={() => setPage("analytics")}
      />

      <div className="analytics-grid">

        <div className="analytics-tile holdings-tile">

          <h3>Silver</h3>

          <strong>
            {formatMetalWeight(silver.total)}
          </strong>

          <small>
            Pure: {formatMetalWeight(silver.pure)}
          </small>

        </div>

        <div className="analytics-tile holdings-tile">

          <h3>Gold</h3>

          <strong>
            {formatMetalWeight(gold.total)}
          </strong>

          <small>
            Pure: {formatMetalWeight(gold.pure)}
          </small>

        </div>

        <div className="analytics-tile holdings-tile">

          <h3>Copper</h3>

          <strong>
            {formatMetalWeight(copper.total)}
          </strong>

          <small>
            Total weight
          </small>

        </div>

        <div className="analytics-tile holdings-tile">

          <h3>Natural Diamonds</h3>

          <strong>
            {naturalDiamonds.toLocaleString(
              undefined,
              {
                minimumFractionDigits: 2,
                maximumFractionDigits: 3,
              }
            )} ct
          </strong>

          <small>
            Total carat weight
          </small>

        </div>

        <div className="analytics-tile holdings-tile">

          <h3>Lab Diamonds</h3>

          <strong>
            {labDiamonds.toLocaleString(
              undefined,
              {
                minimumFractionDigits: 2,
                maximumFractionDigits: 3,
              }
            )} ct
          </strong>

          <small>
            Total carat weight
          </small>

        </div>

      </div>

    </div>

  );

}