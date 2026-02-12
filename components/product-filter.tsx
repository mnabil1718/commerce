"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { Card, CardContent } from "./ui/card";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Category } from "@/types/category.type";
import { displayRupiah } from "@/utils/price";

export type ProductFilterProps = {
  min: number;
  max: number;
  categories: Category[];
};

export function ProductFilter({ min, max, categories }: ProductFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [price, setPrice] = useState<[number, number]>([min, max]);
  const [category, setCategory] = useState<string | undefined>(
    searchParams.get("category") || undefined,
  );

  useEffect(() => {
    const timeout = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());

      params.set("min", price[0].toString());
      params.set("max", price[1].toString());

      if (category) {
        params.set("category", category);
      } else {
        params.delete("category");
      }

      router.replace(`/products?${params.toString()}`);
    }, 500); // 500ms debounce

    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [price, category, router]);

  return (
    <Card className="p-0 sticky top-28">
      <CardContent className="p-0 gap-0 flex flex-col">
        <section className="p-5 border-b">
          <h1 className="text-lg font-medium">Product Filter</h1>
        </section>

        {/* Price */}
        <section className="flex flex-col gap-3 p-5">
          <h3 className="text-sm">Price Range</h3>

          <Slider
            value={price}
            onValueChange={(val) => setPrice(val as [number, number])}
            max={max}
            step={100000}
            className="w-full"
          />

          <div className="flex justify-between text-xs font-semibold text-muted-foreground/80">
            <p>{displayRupiah(price[0])}</p>
            <p>{displayRupiah(price[1])}</p>
          </div>
        </section>

        {/* Category */}
        <section className="flex flex-col gap-3 p-5">
          <h3 className="text-sm">Select Category</h3>

          <Select
            value={category ?? "all"}
            onValueChange={(value) =>
              setCategory(value === "all" ? undefined : value)
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories?.map((c) => (
                <SelectItem key={c.id} value={c.id.toString()}>
                  {c.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </section>
      </CardContent>
    </Card>
  );
}
