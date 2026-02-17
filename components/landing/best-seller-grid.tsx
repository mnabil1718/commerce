"use client";

import { Product } from "@/types/product.type";
import { ProductCard } from "../product-card";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { POSTGRES_CHANGES } from "@/constants/realtime";

export function BestSellerGrid({ feed }: { feed: Product[] }) {
  const [products, setProducts] = useState<Product[]>(feed);

  useEffect(() => {
    const channel = supabase
      .channel("products:bestseller:grid")
      .on(
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
            // payload.new is empty on DELETE, use payload.old instead
            setProducts((prev) =>
              prev.filter((p) => p.id !== (payload.old as Product).id),
            );
          }
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {products.map((p) => {
        return <ProductCard key={p.id} product={p} />;
      })}
    </ul>
  );
}
