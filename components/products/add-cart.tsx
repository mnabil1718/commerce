"use client";

import { useCartStore } from "@/providers/cart.provider";
import { Product } from "@/types/product.type";
import useStore from "@/hooks/use-store";
import { Quantity } from "../quantity";
import { Button } from "../ui/button";
import { useState } from "react";

export function AddCart({ product }: { product: Product }) {
  const store = useStore(useCartStore, (state) => state);
  const [q, setQty] = useState<number>(1);

  if (!store) return null;

  const found = store.find(product.id);

  return (
    <div className="flex items-stretch gap-3">
      <Quantity init={q} max={product.stock} changeCallback={setQty} />
      <Button
        onClick={() => store.addItem(product, q)}
        disabled={found !== undefined || q === 0}
        className="rounded-full font-semibold"
      >
        {found ? "Added to Cart" : "Add to cart"}
      </Button>
    </div>
  );
}
