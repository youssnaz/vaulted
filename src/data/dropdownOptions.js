export const assetOptions = [
  "Silver",
  "Gold",
  "Copper",
  "Diamond",
  "Lab Diamond",
  "Other",
];

export const metalTypes = [
  "Coin",
  "Round",
  "Bar",
  "Medallion",
  "Jewellery",
  "Other",
];

export const diamondTypes = [
  "Loose",
  "Ring",
  "Pendant",
  "Earrings",
  "Bracelet",
  "Other",
];

export const otherTypes = [
  "Other",
];

export const purities = [
  "99.99%",
  "99.9%",
  "95%",
  "92.5%",
  "90%",
  "80%",
  "50%",
  "40%",
  "35%",
  "25%",
  "Custom",
];

// Used internally for calculations only.
// The dropdown still displays percentages.
export function getPurityMultiplier(purity) {

  switch (purity) {

    case "99.99%":
      return 0.9999;

    case "99.9%":
      return 0.999;

    case "95%":
      return 0.95;

    case "92.5%":
      return 0.925;

    case "90%":
      return 0.90;

    case "80%":
      return 0.80;

    case "50%":
      return 0.50;

    case "40%":
      return 0.40;

    case "35%":
      return 0.35;

    case "25%":
      return 0.25;

    default:
      return 1;

  }

}