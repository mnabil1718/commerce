import Address from "../public/address.png";
import Image from "next/image";

export function EmptyAddress() {
  return (
    <Image
      src={Address}
      width={200}
      height={200}
      alt="coffee"
      placeholder="blur"
    />
  );
}
