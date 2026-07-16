// src/services/marketService.js

export async function getMarketData() {
  try {
    const [goldResponse, silverResponse] = await Promise.all([
      fetch("https://api.gold-api.com/price/XAU/USD"),
      fetch("https://api.gold-api.com/price/XAG/USD"),
    ]);

    const [goldData, silverData] = await Promise.all([
      goldResponse.json(),
      silverResponse.json(),
    ]);

    return {
      gold: goldData.price,
      silver: silverData.price,
      usdZar: null,
      lastUpdated: new Date().toISOString(),
    };
  } catch (error) {
    console.error("Failed to fetch market data:", error);

    return {
      gold: null,
      silver: null,
      usdZar: null,
      lastUpdated: null,
    };
  }
}