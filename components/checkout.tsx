"use client";

import useStore from "@/hooks/use-store";
import { useCartStore } from "@/providers/cart.provider";
import { Button } from "./ui/button";
import { EmptyCoffee } from "./empty-coffee";
import Link from "next/link";
import { Card, CardHeader, CardTitle } from "./ui/card";
import { ShippingAddressManager } from "./shipping-address/shipping-address-manager";

export function Checkout() {
  const store = useStore(useCartStore, (state) => state);

  if (!store) return null;

  if (store.items.length == 0) {
    return (
      <div className="w-full min-h-96 flex flex-col items-center justify-center gap-5">
        <EmptyCoffee />
        <span className="text-muted-foreground text-center">
          Your cart items is empty. let&apos;s fill it with your favourite
          drinks.
        </span>
        <Link href="/products">
          <Button className="font-medium rounded-full">
            Choose your drinks
          </Button>
        </Link>
      </div>
    );
  }

  if (store.items.length > 0) {
    return (
      <div className="w-full grid grid-cols-3 gap-5">
        <div className="col-span-3 md:col-span-2">
          <ShippingAddressManager />
        </div>

        <Card className="col-span-3 md:col-span-1">
          <CardHeader>
            <CardTitle>Payment Method</CardTitle>
          </CardHeader>
        </Card>
      </div>
    );
  }
}
