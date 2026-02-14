import { Checkout } from "@/components/checkout";

export default function CheckoutPage() {
  return (
    <>
      <div className="grid grid-cols-2 gap-5 p-5">
        <div className="col-span-2 flex flex-col gap-2 items-start">
          <h2 className="font-bold text-2xl mb-4">Checkout</h2>
          <Checkout />
        </div>
      </div>
    </>
  );
}
