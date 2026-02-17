"use client";

import { Product } from "@/types/product.type";
import { ProductCard } from "../product-card";
import { useEffect, useRef, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { RealtimeChannel } from "@supabase/supabase-js";
import {
  POSTGRES_CHANGES,
  PUBLIC_PRODUCTS_CHANNEL,
} from "@/constants/realtime";

export function BestSellerGrid({ feed }: { feed: Product[] }) {
  const supabase = createClient();
  const ref = useRef<RealtimeChannel | null>(null);
  const [products, setProducts] = useState<Product[]>(feed.splice(0, 6));

  const subscription = () => {
    const ch = supabase.channel(PUBLIC_PRODUCTS_CHANNEL);

    ch.on(
      POSTGRES_CHANGES,
      {
        event: "*",
        schema: "public",
        table: "products",
      },
      (payload) => {
        if (payload.eventType === "INSERT") {
          setProducts((prev) => [...prev, payload.new as Product]);
        }

        if (payload.eventType === "UPDATE") {
          setProducts((prev) =>
            prev.map((p) =>
              p.id === (payload.new as Product).id
                ? (payload.new as Product)
                : p,
            ),
          );
        }

        if (payload.eventType === "DELETE") {
          setProducts((prev) =>
            prev.filter((p) => p.id !== (payload.old as Product).id),
          );
        }
      },
    ).subscribe();

    return ch;
  };

  useEffect(() => {
    ref.current = subscription();

    return () => {
      ref.current?.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {products.map((p) => {
        return <ProductCard key={p.id} product={p} />;
      })}
    </ul>
  );
}
