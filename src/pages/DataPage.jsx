import { useState } from "react";

import Header from "../components/Header";

import {
  Download,
  Upload,
} from "lucide-react";

export default function DataPage({
  setPage,
  assets,
  nextAssetNumber,
  setAssets,
  setNextAssetNumber,
}) {

  const [pendingImport, setPendingImport] =
    useState(null);

  const [message, setMessage] =
    useState(null);

  function handleExport() {

    const portfolioData = {

      version: "1.0",

      exportedAt:
        new Date().toISOString(),

      nextAssetNumber,

      assets: assets.map((asset) => {

        const exportedAsset = {

          id: asset.id,
          description: asset.description,
          asset: asset.asset,
          type: asset.type,
          quantity: asset.quantity,
          weight: asset.weight,
          purity: asset.purity,
          price: asset.price,

        };

        const needsManualValue =
          asset.asset === "Copper" ||
          asset.asset === "Diamond" ||
          asset.asset === "Lab Diamond" ||
          asset.asset === "Other";

        if (needsManualValue) {

          exportedAsset.currentValue =
            asset.currentValue;

        }

        return exportedAsset;

      }),

    };

    const file = new Blob(
      [JSON.stringify(portfolioData, null, 2)],
      {
        type: "application/json",
      }
    );

    const downloadUrl =
      URL.createObjectURL(file);

    const link =
      document.createElement("a");

    link.href = downloadUrl;

    link.download =
      `VAULTED Portfolio ${new Date()
        .toISOString()
        .slice(0, 10)}.json`;

    document.body.appendChild(link);

    link.click();

    link.remove();

    URL.revokeObjectURL(downloadUrl);

  }

  function calculateImportedValue(asset) {

    if (
      asset.asset !== "Silver" &&
      asset.asset !== "Gold"
    ) {

      return asset.currentValue || "";

    }

    const ounceInGrams = 31.1034768;

    const spotKey =
      asset.asset === "Silver"
        ? "silverSpot"
        : "goldSpot";

    const spot =
      Number(
        localStorage.getItem(spotKey)
      ) || 0;

    const usdZar =
      Number(
        localStorage.getItem("usdZar")
      ) || 0;

    const purityMultiplier =
      (parseFloat(asset.purity) || 0) / 100;

    const weight =
      Number(asset.weight) || 0;

    return (
      (spot / ounceInGrams) *
      weight *
      purityMultiplier *
      usdZar
    ).toFixed(2);

  }

  function handleImportFile(event) {

    const selectedFile =
      event.target.files?.[0];

    event.target.value = "";

    if (!selectedFile) return;

    const reader =
      new FileReader();

    reader.onload = () => {

      try {

        const portfolioData =
          JSON.parse(reader.result);

        if (
          !Array.isArray(
            portfolioData.assets
          )
        ) {

          throw new Error(
            "Invalid VAULTED portfolio file."
          );

        }

        setPendingImport(
          portfolioData
        );

      } catch (error) {

        setMessage({
          title: "Import Failed",
          text:
            "This file could not be imported. Please choose a valid VAULTED portfolio file.",
        });

      }

    };

    reader.readAsText(selectedFile);

  }

  function confirmImport() {

    if (!pendingImport) return;

    const importedAssets =
      pendingImport.assets.map(
        (asset) => ({

          ...asset,

          currentValue:
            calculateImportedValue(asset),

        })
      );

    setAssets(importedAssets);

    setNextAssetNumber(
      Number(
        pendingImport.nextAssetNumber
      ) || 1
    );

    setPendingImport(null);

    setMessage({
      title: "Portfolio Imported",
      text:
        "Your portfolio has been restored successfully.",
    });

  }

  return (

    <div className="data-screen">

      <Header
        title="Data"
        onBack={() => setPage("home")}
      />

      <div className="data-card">

        <h2>Portfolio Data</h2>

        <p>
          Export or restore all of your
          portfolio assets and details.
        </p>

        <button
          className="data-action"
          onClick={handleExport}
        >

          <span className="data-action-icon">

            <Download size={20} />

          </span>

          <span className="data-action-copy">

            <strong>
              Export Portfolio
            </strong>

            <small>
              Save your portfolio to a file
            </small>

          </span>

        </button>

        <label className="data-action">

          <span className="data-action-icon">

            <Upload size={20} />

          </span>

          <span className="data-action-copy">

            <strong>
              Import Portfolio
            </strong>

            <small>
              Restore an exported portfolio
            </small>

          </span>

          <input
            type="file"
            accept=".json,application/json"
            onChange={handleImportFile}
            hidden
          />

        </label>

      </div>

      <div className="data-about">

        <strong>VAULTED</strong>

        <small>Version 1.0</small>

      </div>

      {pendingImport && (

        <div className="delete-overlay">

          <div className="dialog">

            <h3 className="dialog-title">
              Import Portfolio?
            </h3>

            <p className="dialog-subtitle">
              This will replace the portfolio
              currently stored on this device.
            </p>

            <div className="delete-actions">

              <button
                className="cancel-button"
                onClick={() =>
                  setPendingImport(null)
                }
              >
                Cancel
              </button>

              <button
                className="confirm-delete-button"
                onClick={confirmImport}
              >
                Import
              </button>

            </div>

          </div>

        </div>

      )}

      {message && (

        <div className="delete-overlay">

          <div className="dialog">

            <h3 className="dialog-title">
              {message.title}
            </h3>

            <p className="dialog-subtitle">
              {message.text}
            </p>

            <div className="delete-actions">

              <button
                className="confirm-delete-button"
                onClick={() =>
                  setMessage(null)
                }
              >
                OK
              </button>

            </div>

          </div>

        </div>

      )}

    </div>

  );

}