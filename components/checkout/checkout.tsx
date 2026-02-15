"use client";

import useStore from "@/hooks/use-store";
import { useCartStore } from "@/providers/cart.provider";
import { Button } from "../ui/button";
import { EmptyCoffee } from "../empty-coffee";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { ShippingAddressManager } from "../shipping-address/shipping-address-manager";
import { CartItemComponent } from "../cart/cart-item";
import { PaymentMethod } from "./payment-method";

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
        <div className="grid col-span-3 md:col-span-2 gap-5">
          <ShippingAddressManager />
          <Card>
            <CardHeader>
              <CardTitle>Review Your Order</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-5">
                {store.items.length > 0 &&
                  store.items.map((item) => {
                    return (
                      <CartItemComponent key={item.product_id} item={item} />
                    );
                  })}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="col-span-3 md:col-span-1">
          <PaymentMethod />
        </div>
      </div>
    );
  }
}
