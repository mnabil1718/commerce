"use client";

import { useCartStore } from "@/providers/cart.provider";
import { Product } from "@/types/product.type";
import useStore from "@/hooks/use-store";
import { Quantity } from "../quantity";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";

export function AddCart({ p }: { p: Product }) {
  const store = useStore(useCartStore, (state) => state);
  const [q, setQty] = useState<number>(p.stock > 0 ? 1 : 0);

  useEffect(() => {
    if (p.stock === 0) setQty(0);
  }, [p]);

  if (!store) return null;

  const found = store.find(p.id);

  return (
    <>
      <div className="w-fit relative flex items-stretch">Stock: {p.stock}</div>
      <div className="flex items-stretch gap-3">
        <Quantity init={q} max={p.stock} changeCallback={setQty} />
        <Button
          onClick={() => store.addItem(p, q)}
          disabled={found !== undefined || q === 0}
          className="rounded-full font-semibold"
        >
          {found ? "Added to Cart" : "Add to cart"}
        </Button>
      </div>
    </>
  );
}
