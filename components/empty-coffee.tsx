import Coffee from "../public/spilled-coffee.png";
import Image from "next/image";

export function EmptyCoffee() {
  return (
    <Image
      src={Coffee}
      width={200}
      height={200}
      alt="coffee"
      placeholder="blur"
      className="opacity-60"
    />
  );
}
