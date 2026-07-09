import type { Load } from "@/entities/load";
import { formatCurrency } from "./format-currency";

export function formatPrice(load: Load) {
  const amount = load.paymentAmount;
  const currency = load.paymentCurrency || null;

  if (!amount) return "Kelishiladi";

  const formattedAmount =
    amount > 1_000_000
      ? `${amount / 1_000_000} mln`
      : amount.toLocaleString("uz-UZ");


  const formattedCurrency = formatCurrency(currency);

  return `${formattedAmount} ${formattedCurrency}`;
}
