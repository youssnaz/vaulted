import Header from "../components/Header";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const COLORS = {
  Silver: "#D8DEE9",
  Gold: "#D4AF37",
  Diamond: "#6FD6FF",
  "Lab Diamond": "#3F72FF",
  Copper: "#B87333",
  Other: "#7B61FF",
};

export default function AssetAllocation({
  setPage,
  assets,
}) {

  function totalValue(assetName) {

    return assets
      .filter(
        asset => asset.asset === assetName
      )
      .reduce(
        (sum, asset) =>
          sum +
          (Number(asset.currentValue) || 0) *
          (Number(asset.quantity) || 0),
        0
      );

  }

  const data = [

    {
      name: "Silver",
      value: totalValue("Silver"),
    },

    {
      name: "Gold",
      value: totalValue("Gold"),
    },

    {
      name: "Diamond",
      value: totalValue("Diamond"),
    },

    {
      name: "Lab Diamond",
      value: totalValue("Lab Diamond"),
    },

    {
      name: "Copper",
      value: totalValue("Copper"),
    },

    {
      name: "Other",
      value: totalValue("Other"),
    },

  ].filter(item => item.value > 0);

  const totalPortfolio =
    data.reduce(
      (sum, item) => sum + item.value,
      0
    );

function percentage(value) {

  if (totalPortfolio === 0)
    return 0;

  return (
    (value / totalPortfolio) *
    100
  );

}

function formatPortfolioValue(value) {

  if (value >= 1000000) {

    const millions =
      value / 1000000;

    return `R${millions.toFixed(
      millions >= 10 ? 0 : 1
    )}M`;

  }

  if (value >= 1000) {

    const thousands =
      value / 1000;

    return `R${thousands.toFixed(1)}K`;

  }

  return `R${value.toLocaleString()}`;

}

return (

    <div className="analytics-screen">

      <Header
        title="Asset Allocation"
        onBack={() =>
          setPage("analytics")
        }
      />

      <div
  className="analytics-card"
  style={{
    position: "relative",
  }}
>
        <div
          style={{
            width: "100%",
            height: 340,
          }}
        >

          <ResponsiveContainer>

            <PieChart>
                          <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                innerRadius={75}
                outerRadius={120}
                paddingAngle={3}
                stroke="#171b22"
                strokeWidth={2}
                animationDuration={900}
              >

                {data.map((entry) => (

                  <Cell
                    key={entry.name}
                    fill={COLORS[entry.name]}
                  />

                ))}

              </Pie>

              <Tooltip
                formatter={(value) => [
                  `R ${Number(value).toLocaleString()}`,
                  "Value",
                ]}
              />

            </PieChart>

          </ResponsiveContainer>

        </div>

        <div
  style={{
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    textAlign: "center",
    pointerEvents: "none",
    width: "140px",
  }}
>

     <h3
  style={{
    color: "#9ca3af",
    margin: 0,
    fontSize: "11px",
    fontWeight: 500,
    letterSpacing: "0.8px",
    textTransform: "uppercase",
  }}
>
  Portfolio
</h3>

      <h2
  style={{
    color: "white",
    margin: "5px 0 0",
    fontSize: "16px",
    fontWeight: 700,
    lineHeight: "1.2",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  }}
>
{formatPortfolioValue(totalPortfolio)}
          </h2>

        </div>

      </div>

      {[...data]
  .sort((a, b) => b.value - a.value)
  .map((item) => (
          <div
            className="allocation-row"
            key={item.name}
          >

            <div className="allocation-row-top">

              <div className="allocation-name">

                <span
                  className="allocation-dot"
                  style={{
                    background:
                      COLORS[item.name],
                  }}
                />

                <span>
                  {item.name}
                </span>

              </div>

              <span className="allocation-percent">
                {percentage(item.value).toFixed(1)}%
              </span>

            </div>

            <div className="allocation-track">

              <div
                className="allocation-progress"
                style={{
                  width: `${percentage(item.value)}%`,
                  background:
                    COLORS[item.name],
                }}
              />

            </div>

            <div className="allocation-value">

              R {item.value.toLocaleString()}

            </div>

          </div>

        ))}

    </div>

  );

}