import type { Load } from "@/entities/load";

export function formatPrice(load: Load) {
  const amount = load.paymentAmount;
  const currency = load.paymentCurrency || null;

  if (!amount) return "Kelishiladi";

  const formattedAmount =
    amount > 1_000_000
      ? `${amount / 1_000_000} mln`
      : amount.toLocaleString("uz-UZ");

  function formatCurrency(value: "sum" | "usd" | null) {
    switch (value) {
      case "sum":
        return "so'm";
      case "usd":
        return "$";
      default:
        return "";
    }
  }
  const formattedCurrency = formatCurrency(currency);

  return `${formattedAmount} ${formattedCurrency}`;
}
