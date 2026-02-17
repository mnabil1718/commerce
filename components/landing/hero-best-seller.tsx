"use client";

import { Product } from "@/types/product.type";
import { displayRupiah } from "@/utils/price";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "../ui/button";
import Image from "next/image";
import { Star } from "lucide-react";
import { useEffect, useState } from "react";
import { POSTGRES_CHANGES } from "@/constants/realtime";
import { supabase } from "@/lib/supabase/client";

export function HeroBestSeller({ featured }: { featured: Product }) {
  const [product, setProduct] = useState<Product>(featured);

  useEffect(() => {
    const channel = supabase
      .channel("products:bestseller:hero")
      .on(
        POSTGRES_CHANGES,
        {
          event: "UPDATE",
          schema: "public",
          table: "products",
          filter: `id=eq.${featured.id}`,
        },
        (payload) => {
          setProduct(payload.new as Product);
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [featured.id]);

  return (
    <Card className="col-span-2 overflow-hidden p-0">
      <CardContent className="relative grid grid-cols-2 gap-0 p-0 overflow-hidden">
        <div className="col-span-2 md:col-span-1 p-7 space-y-5">
          <Badge
            variant={"outline"}
            className="rounded-full flex gap-1 items-center w-fit"
          >
            <Star size={12} /> Best Seller
          </Badge>
          <div>
            <h1
              title={product.title}
              className="text-3xl tracking-tight font-bold mb-3 line-clamp-2"
            >
              {product.title}
            </h1>
            <p className="line-clamp-2">{product.description}</p>
          </div>
          <h2 className="font-semibold text-3xl tracking-tight text-primary">
            {displayRupiah(product.price)}
          </h2>

          <Link href={`/products/${product.slug}`}>
            <Button className="rounded-full">Order Now</Button>
          </Link>
        </div>
        <div className="relative order-first md:order-last col-span-2 md:col-span-1 overflow-hidden w-full h-full min-h-72">
          {product.image && (
            <Image
              src={product.image}
              alt={product.title}
              placeholder="blur"
              blurDataURL={product.image}
              fill
              className="w-full h-full object-cover"
            />
          )}
        </div>
      </CardContent>
    </Card>
  );
}
