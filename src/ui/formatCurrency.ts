export function formatCurrency(amount: number): string {
  // Use Intl.NumberFormat to format the currency
  const formattedCurrency = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);

  return formattedCurrency;
}
