import { useState, useEffect } from "react";

import Home from "./pages/Home";
import AddPage from "./pages/AddPage";
import Portfolio from "./pages/Portfolio";
import AssetDetails from "./pages/AssetDetails";
import Market from "./pages/Market";
import Analytics from "./pages/Analytics";
import Holdings from "./pages/Holdings";
import ValueByAsset from "./pages/ValueByAsset";
import AssetAllocation from "./pages/AssetAllocation";
import CollectionBreakdown from "./pages/CollectionBreakdown";
import DataPage from "./pages/DataPage";

import "./App.css";

function App() {

  const [page, setPage] = useState("home");

  const [assets, setAssets] = useState(() => {

    const savedAssets =
      localStorage.getItem("assets");

    return savedAssets
      ? JSON.parse(savedAssets)
      : [];

  });

  const [nextAssetNumber, setNextAssetNumber] = useState(() => {

    const savedNumber =
      localStorage.getItem("nextAssetNumber");

    return savedNumber
      ? Number(savedNumber)
      : 1;

  });

  const [selectedAsset, setSelectedAsset] = useState(null);

  useEffect(() => {

    localStorage.setItem(
      "assets",
      JSON.stringify(assets)
    );

  }, [assets]);

  useEffect(() => {

    localStorage.setItem(
      "nextAssetNumber",
      nextAssetNumber
    );

  }, [nextAssetNumber]);

  return (

    <>

      {page === "home" && (

  <Home
    setPage={setPage}
    setSelectedAsset={setSelectedAsset}
  />

)}

      {page === "add" && (

        <AddPage
          setPage={setPage}
          assets={assets}
          setAssets={setAssets}
          nextAssetNumber={nextAssetNumber}
          setNextAssetNumber={setNextAssetNumber}
          selectedAsset={selectedAsset}
          setSelectedAsset={setSelectedAsset}
        />

      )}

      {page === "portfolio" && (

        <Portfolio
          setPage={setPage}
          assets={assets}
          setAssets={setAssets}
          setSelectedAsset={setSelectedAsset}
        />

      )}

      {page === "details" && (

        <AssetDetails
          setPage={setPage}
          selectedAsset={selectedAsset}
        />

      )}

      {page === "market" && (

        <Market
          setPage={setPage}
        />

      )}

      {page === "analytics" && (

        <Analytics
          setPage={setPage}
          assets={assets}
        />

      )}

      {page === "holdings" && (

        <Holdings
          setPage={setPage}
          assets={assets}
        />

      )}

      {page === "valueByAsset" && (

        <ValueByAsset
          setPage={setPage}
          assets={assets}
        />

      )}

      {page === "assetAllocation" && (

        <AssetAllocation
          setPage={setPage}
          assets={assets}
        />

      )}

      {page === "collectionBreakdown" && (

        <CollectionBreakdown
          setPage={setPage}
          assets={assets}
        />

      )}
{page === "data" && (

  <DataPage
    setPage={setPage}
    assets={assets}
    nextAssetNumber={nextAssetNumber}
    setAssets={setAssets}
    setNextAssetNumber={setNextAssetNumber}
  />

)}
    </>

  );

}

export default App;