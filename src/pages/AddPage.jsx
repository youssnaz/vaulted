import { useState, useEffect } from "react";

import Header from "../components/Header";
import TextField from "../components/TextField";
import Dropdown from "../components/Dropdown";

import {
  assetOptions,
  metalTypes,
  diamondTypes,
  otherTypes,
  purities,
} from "../data/dropdownOptions";

export default function AddPage({
  setPage,
  assets,
  setAssets,
  nextAssetNumber,
  setNextAssetNumber,
  selectedAsset,
  setSelectedAsset,
}) {

  const [description, setDescription] = useState("");

  const [asset, setAsset] = useState("Silver");
  const [type, setType] = useState("Coin");

  const [purity, setPurity] = useState("99.9%");
  const [customPurity, setCustomPurity] = useState("");

  const [quantity, setQuantity] = useState("");
  const [weight, setWeight] = useState("");
  const [price, setPrice] = useState("");
  const [currentValue, setCurrentValue] = useState("");

  const isEditing =
    selectedAsset !== null;

  const isMetal =
    asset === "Silver" ||
    asset === "Gold" ||
    asset === "Copper";

  const isDiamond =
    asset === "Diamond" ||
    asset === "Lab Diamond";

  const showCurrentValue =
    asset === "Copper" ||
    asset === "Diamond" ||
    asset === "Lab Diamond" ||
    asset === "Other";

  const typeOptions = isMetal
    ? metalTypes
    : isDiamond
    ? diamondTypes
    : otherTypes;

  useEffect(() => {

    if (selectedAsset) {

      setDescription(
        selectedAsset.description
      );

      setAsset(selectedAsset.asset);

      setType(selectedAsset.type);

      if (
        selectedAsset.purity &&
        !purities.includes(
          selectedAsset.purity
        )
      ) {

        setPurity("Custom");

        setCustomPurity(
          selectedAsset.purity.replace(
            "%",
            ""
          )
        );

      } else {

        setPurity(
          selectedAsset.purity
        );

        setCustomPurity("");

      }

      setQuantity(
        selectedAsset.quantity
      );

      setWeight(
        selectedAsset.weight
      );

      setPrice(
        selectedAsset.price
      );

      setCurrentValue(
        selectedAsset.currentValue
      );

    } else {

      setDescription("");

      setAsset("Silver");

      setType("Coin");

      setPurity("99.9%");

      setCustomPurity("");

      setQuantity("");

      setWeight("");

      setPrice("");

      setCurrentValue("");

    }

  }, [selectedAsset]);
useEffect(() => {

  const defaultType =
    isMetal
      ? "Coin"
      : isDiamond
      ? "Loose"
      : "Other";

  // If the current type doesn't exist for the selected asset,
  // reset it to the default.
  if (!typeOptions.includes(type)) {

    setType(defaultType);

  }

}, [asset, typeOptions, type, isMetal, isDiamond]);

  function handleSave() {
        const finalPurity =
  purity === "Custom"
    ? `${customPurity}%`
    : purity;

let calculatedCurrentValue = currentValue;

if (isEditing) {

      const updatedAssets = assets.map((item) =>

        item.id === selectedAsset.id

          ? {
              ...item,

              description,
              asset,
              type,
              purity: finalPurity,

              quantity,
              weight,
              price,
             currentValue: calculatedCurrentValue,
            }

          : item

      );

      setAssets(updatedAssets);

      setSelectedAsset(null);

      setPage("portfolio");

      return;

    }

    const id =
      `V${String(nextAssetNumber).padStart(4, "0")}`;

    const newAsset = {

      id,

      description,
      asset,
      type,
      purity: finalPurity,

      quantity,
      weight,
      price,
      currentValue: calculatedCurrentValue,

    };

    setAssets([...assets, newAsset]);

    setNextAssetNumber(
      nextAssetNumber + 1
    );

    setDescription("");

setAsset("Silver");
setType("Coin");

setPurity("99.9%");
setCustomPurity("");

setQuantity("");
setWeight("");
setPrice("");
setCurrentValue("");

// Stay on the Add Asset page.
// Press Done in the header when finished adding assets.

  }

   return (

    <div className="page-screen">

      <Header
        title={
          isEditing
            ? "Edit Asset"
            : "Add Asset"
        }
        onBack={() => {

          if (isEditing) {

            setPage("details");
            return;

          }

          setPage("home");

        }}
        onDone={() => {

          if (isEditing) {

            setPage("details");
            return;

          }

          setSelectedAsset(null);

          setPage("portfolio");

        }}
        showDone={true}
      />

      <div className="form-card">

        <TextField
          label="Description"
          placeholder="Enter description..."
          value={description}
          onChange={(e) =>
            setDescription(e.target.value)
          }
        />

        <Dropdown
          label="Asset"
          value={asset}
          options={assetOptions}
          onChange={setAsset}
        />

        <Dropdown
          label="Type"
          value={type}
          options={typeOptions}
          onChange={setType}
        />

        <div className="two-column">

          <TextField
            label="Quantity"
            placeholder="1"
            type="number"
            value={quantity}
            onChange={(e) =>
              setQuantity(e.target.value)
            }
          />

          <TextField
            label={
              isDiamond
                ? "Weight (ct)"
                : "Weight (g)"
            }
            placeholder="0.00"
            type="number"
            value={weight}
            onChange={(e) =>
              setWeight(e.target.value)
            }
          />

        </div>
                {isMetal && (

          <>

            <Dropdown
              label="Purity"
              value={purity}
              options={purities}
              onChange={setPurity}
            />

            {purity === "Custom" && (

              <TextField
                label="Custom Purity (%)"
                placeholder="87.5"
                type="number"
                value={customPurity}
                onChange={(e) =>
                  setCustomPurity(e.target.value)
                }
              />

            )}

          </>

        )}

        <TextField
          label="Purchase Price (R)"
          placeholder="0.00"
          type="number"
          value={price}
          onChange={(e) =>
            setPrice(e.target.value)
          }
        />

        {showCurrentValue && (

          <TextField
            label="Current Value (R)"
            placeholder="0.00"
            type="number"
            value={currentValue}
            onChange={(e) =>
              setCurrentValue(e.target.value)
            }
          />

        )}

      </div>
            <button
        className="save-button"
        onClick={handleSave}
      >
        {isEditing
          ? "Update Asset"
          : "Save Asset"}
      </button>

    </div>

  );

}