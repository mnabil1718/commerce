export function formatPriceDisplay(locale: string, price: number): string {
  return new Intl.NumberFormat(locale, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(Math.floor(price));
}

export function displayRupiah(price: number): string {
    const fmt = formatPriceDisplay("id-ID", price);
    return "Rp " + fmt;
}
