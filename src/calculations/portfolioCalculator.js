const OUNCE_IN_GRAMS = 31.1034768;

export function calculateCurrentValue(asset, marketData) {
  const quantity = Number(asset.quantity) || 0;
  const weight = Number(asset.weight) || 0;
  const purity = (parseFloat(asset.purity) || 100) / 100;

  // Manual assets
  if (
    asset.asset === "Diamond" ||
    asset.asset === "Lab Diamond" ||
    asset.asset === "Copper" ||
    asset.asset === "Other"
  ) {
    const current = Number(asset.currentValue) || 0;

    return {
      current,
      totalCurrent: current * quantity,
    };
  }

  // Silver
  if (asset.asset === "Silver") {
    const pricePerGramUSD =
      (marketData.silver || 0) / OUNCE_IN_GRAMS;

    const current =
      pricePerGramUSD *
      weight *
      purity *
      (marketData.usdZar || 0);

    return {
      current,
      totalCurrent: current * quantity,
    };
  }

  // Gold
  if (asset.asset === "Gold") {
    const pricePerGramUSD =
      (marketData.gold || 0) / OUNCE_IN_GRAMS;

    const current =
      pricePerGramUSD *
      weight *
      purity *
      (marketData.usdZar || 0);

    return {
      current,
      totalCurrent: current * quantity,
    };
  }

  return {
    current: 0,
    totalCurrent: 0,
  };
}