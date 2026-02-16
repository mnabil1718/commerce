import Order from "../public/order.png";
import Image from "next/image";

export function EmptyOrders() {
  return (
    <Image
      src={Order}
      width={200}
      height={200}
      alt="empty orders"
      placeholder="blur"
    />
  );
}
