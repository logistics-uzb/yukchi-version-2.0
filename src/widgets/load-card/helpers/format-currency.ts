export function formatCurrency(value: "sum" | "usd" | null) {
  switch (value) {
    case "sum":
      return "so'm";
    case "usd":
      return "$";
    default:
      return "";
  }
}
