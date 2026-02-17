"use client";

import { Product } from "@/types/product.type";
import { useEffect, useState } from "react";
import { ProductCard } from "../product-card";
import { ProductSort } from "./product-sort";
import { supabase } from "@/lib/supabase/client";
import { POSTGRES_CHANGES } from "@/constants/realtime";

export function ProductCatelogGrid({ products }: { products: Product[] }) {
  const [p, setP] = useState<Product[]>(products);

  useEffect(() => {
    const channel = supabase
      .channel("products:catalog:grid")
      .on(
        POSTGRES_CHANGES,
        {
          event: "*",
          schema: "public",
          table: "products",
        },
        (payload) => {
          if (payload.eventType === "INSERT") {
            setP((prev) => [...prev, payload.new as Product]);
          }

          if (payload.eventType === "UPDATE") {
            setP((prev) =>
              prev.map((p) =>
                p.id === (payload.new as Product).id
                  ? (payload.new as Product)
                  : p,
              ),
            );
          }

          if (payload.eventType === "DELETE") {
            setP((prev) =>
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
    <main className="col-span-3 md:col-span-2 gap-5">
      <div className="flex justify-between items-center mb-3">
        <p className="text-sm text-muted-foreground/70">
          Showing {p.length} products
        </p>
        <ProductSort />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {p.length > 0 &&
          p.map((product, i) => (
            <ProductCard key={product.id || i} product={product} />
          ))}
        {p.length === 0 && (
          <div className="min-h-48 col-span-1 md:col-span-2 text-muted-foreground/60 flex flex-col justify-center items-center">
            No matches for products found
          </div>
        )}
      </div>
    </main>
  );
}
