import {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";

import { getMarketData } from "../services/marketService";

const MarketContext = createContext();

export function MarketProvider({ children }) {
  const [marketData, setMarketData] = useState({
    gold: null,
    silver: null,
    usdZar: null,
    lastUpdated: null,
    loading: true,
  });

  async function refreshMarketData() {
    setMarketData((prev) => ({
      ...prev,
      loading: true,
    }));

    const data = await getMarketData();

    console.log("Live Market Data:", data);

    setMarketData({
      ...data,
      loading: false,
    });
  }

  useEffect(() => {
    refreshMarketData();

    const interval = setInterval(
      refreshMarketData,
      10 * 60 * 1000
    );

    return () => clearInterval(interval);
  }, []);

  return (
    <MarketContext.Provider
      value={{
        ...marketData,
        refreshMarketData,
      }}
    >
      {children}
    </MarketContext.Provider>
  );
}

export function useMarket() {
  return useContext(MarketContext);
}