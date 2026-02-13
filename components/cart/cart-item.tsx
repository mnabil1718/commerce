"use client";

import { Trash2 } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { CartItem } from "@/stores/cart-store";
import { Card, CardContent } from "../ui/card";
import { displayRupiah } from "@/utils/price";
import { Quantity } from "../quantity";
import { useCartStore } from "@/providers/cart.provider";

interface CartItemComponentProps {
  item: CartItem;
}

export function CartItemComponent({ item }: CartItemComponentProps) {
  const { getSubtotal, removeItem, updateQuantity } = useCartStore(
    (state) => state,
  );
  const sub = getSubtotal(item.product_id);

  return (
    <Card>
      <CardContent className="flex gap-5">
        <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-md">
          <Image
            src={item.image!}
            alt={item.title}
            fill
            className="object-cover"
          />
        </div>

        <div className="flex flex-1 flex-col">
          <div className="flex justify-between">
            <div>
              <h3 className="font-medium">{item.title}</h3>
              <p className="text-sm text-muted-foreground ">
                {displayRupiah(item.price)}/pcs
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => removeItem(item.product_id)}
              className="h-8 w-8 text-destructive/40 hover:text-destructive"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex items-center justify-between mt-auto pt-2">
            <div className="flex items-center gap-2">
              <Quantity
                init={item.qty}
                max={item.stock}
                changeCallback={(v) => updateQuantity(item.product_id, v)}
              />
            </div>
            <p className="font-semibold">{displayRupiah(sub)}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
