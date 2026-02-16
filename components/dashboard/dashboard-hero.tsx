"use client";

import { useAuthStore } from "@/providers/auth.provider";
import { Product } from "@/types/product.type";

import { displayRupiah } from "@/utils/price";
import { Coffee, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { OrderWithRelation } from "@/types/order.type";

export function DashboardHero({
  product,
  orders,
}: {
  product: Product | undefined;
  orders: OrderWithRelation[];
}) {
  const user = useAuthStore((state) => state.user);
  const cups = orders
    .flatMap((order) => order.order_items)
    .reduce((sum, item) => sum + (item.quantity || 0), 0);

  return (
    <div className="col-span-2 grid grid-cols-2 gap-5 pt-12">
      <h1 className="col-span-2 font-medium text-2xl">
        Here&apos;s Your Stats,{" "}
        {user?.user_metadata.full_name || "Mysterious User"}
      </h1>

      <Card className="col-span-1 gap-0 p-0">
        <CardContent className="flex flex-col items-center justify-center p-5">
          <h1 className="text-primary text-4xl font-bold tracking-tight">
            {cups}x
          </h1>
          <span>Cup of drinks ordered</span>
        </CardContent>
      </Card>

      <Card className="col-span-1 gap-0 p-0">
        <CardContent className="h-full flex flex-col items-center justify-center p-5">
          <h1 className="text-primary text-4xl font-bold tracking-tight">
            {orders.length}x
          </h1>
          <span>Placed an order</span>
        </CardContent>
      </Card>

      {product && (
        <Card className="col-span-2 overflow-hidden p-0">
          <CardContent className="relative grid grid-cols-2 gap-0 p-0 overflow-hidden">
            <div className="col-span-2 md:col-span-1 p-7 space-y-5">
              <Badge
                variant={"outline"}
                className="rounded-full flex gap-1 items-center w-fit"
              >
                <Star size={12} /> Your favourite
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
                <Button className="rounded-full">Order Again</Button>
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
      )}
    </div>
  );
}
