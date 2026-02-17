"use client";

import { Product } from "@/types/product.type";
import { useEffect, useRef, useState } from "react";
import { displayRupiah } from "@/utils/price";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { AddCart } from "@/components/products/add-cart";
import { createClient } from "@/lib/supabase/client";
import { RealtimeChannel } from "@supabase/supabase-js";
import {
  POSTGRES_CHANGES,
  PUBLIC_PRODUCTS_CHANNEL,
} from "@/constants/realtime";

export function ProductDetail({ product }: { product: Product }) {
  const supabase = createClient();
  const ref = useRef<RealtimeChannel | null>(null);
  const [p, setP] = useState<Product>(product);

  const subscription = () => {
    const ch = supabase.channel(PUBLIC_PRODUCTS_CHANNEL);

    ch.on(
      POSTGRES_CHANGES,
      {
        event: "UPDATE",
        schema: "public",
        table: "products",
        filter: `id=eq.${product.id}`,
      },
      (payload) => {
        setP(payload.new as Product);
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
    <>
      <div className="col-span-2 md:col-span-1 flex flex-col gap-5">
        <Card className="relative p-0 gap-0 w-full aspect-3/2 overflow-hidden">
          {p.image && (
            <Image
              src={p.image}
              alt={p.title}
              fill
              className={cn("object-cover", p.stock === 0 ? "grayscale" : "")}
            />
          )}
        </Card>
      </div>
      <div className="col-span-2 md:col-span-1 flex flex-col gap-5">
        <Card className="flex flex-col flex-1 ">
          <CardHeader>
            <CardTitle>Product Details</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-5">
            <h1 className="text-3xl font-medium">{p.title}</h1>
            <h2 className="font-semibold text-3xl tracking-tight text-primary">
              {displayRupiah(p.price)}
            </h2>

            <AddCart p={p} />
          </CardContent>
        </Card>
      </div>
      <div className="col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>Product Description</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-5">
            <p className="whitespace-pre-line leading-relaxed">
              {p.description}
            </p>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
