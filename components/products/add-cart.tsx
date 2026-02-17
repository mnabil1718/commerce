"use client";

import { useCartStore } from "@/providers/cart.provider";
import { Product } from "@/types/product.type";
import useStore from "@/hooks/use-store";
import { Quantity } from "../quantity";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { POSTGRES_CHANGES } from "@/constants/realtime";

export function AddCart({ product }: { product: Product }) {
  const [p, setP] = useState<Product>(product);
  const store = useStore(useCartStore, (state) => state);
  const [q, setQty] = useState<number>(p.stock > 0 ? 1 : 0);

  useEffect(() => {
    const channel = supabase
      .channel(`products:${product.id}:add-cart`)
      .on(
        POSTGRES_CHANGES,
        {
          event: "UPDATE",
          schema: "public",
          table: "products",
          filter: `id=eq.${product.id}`,
        },
        (payload) => {
          const updated = payload.new as Product;
          setP(updated);
          // clamp qty if stock drops below current selection
          setQty((prev) => Math.min(prev, updated.stock));
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [product.id]);

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
