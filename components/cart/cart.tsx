"use client";

import { ShoppingBag } from "lucide-react";
import { CartSheet } from "./cart-sheet";
import { Button } from "../ui/button";
import useStore from "@/hooks/use-store";
import { useCartStore } from "@/providers/cart.provider";
import { Badge } from "../ui/badge";

export function Cart() {
  const store = useStore(useCartStore, (state) => state);

  if (!store) return null;

  const items = store.items;

  return (
    <CartSheet>
      <Button variant={"ghost"} className="relative">
        {items.length > 0 && (
          <Badge className="absolute -top-1 -right-1">{items.length}</Badge>
        )}
        <ShoppingBag />
      </Button>
    </CartSheet>
  );
}
