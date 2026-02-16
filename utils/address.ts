import { OrderAddress } from "@/types/order.type";
import { ShippingAddress } from "@/types/shipping-address.type";

export function joinAddress(...parts: (string | undefined | null)[]): string {
  return parts
    .filter((p) => p && p.trim() !== "")
    .join(", ");
}

export function constructFullAddress(data: ShippingAddress | OrderAddress): string {
    return joinAddress(data.address_line1, data.address_line2 || "", data.city, data.country, data.postal_code);
}