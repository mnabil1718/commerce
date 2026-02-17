"use client";

import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { InputGroup, InputGroupAddon, InputGroupInput } from "./ui/input-group";
import { ArrowRight, Loader, SearchIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Product } from "@/types/product.type";
import { getProductsWithoutRelation } from "@/service/product.service";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { StockBadge } from "./stock-badge";
import Image from "next/image";
import { cn } from "@/lib/utils";
import Link from "next/link";

export function SearchDialog({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentQuery = searchParams.get("q") || "";
  const [query, setQuery] = useState(currentQuery);
  const [loading, setLoading] = useState<boolean>(false);
  const [results, setResults] = useState<Product[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setQuery(currentQuery);
  }, [currentQuery]);

  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      return;
    }

    const delayDebounceFn = setTimeout(async () => {
      setLoading(true);
      try {
        const { data: results } = await getProductsWithoutRelation({
          q: query,
        });
        setResults(results);
      } catch (err) {
        console.error("Search failed", err);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  const performSearch = () => {
    const params = new URLSearchParams(searchParams.toString());

    if (query.trim()) {
      params.set("q", query.trim());
    } else {
      params.delete("q");
    }

    router.replace(`/products?${params.toString()}`);
    setOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      performSearch();
    }
  };

  const handleButtonClick = () => {
    performSearch();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="top-5 translate-y-0 px-5">
        <DialogHeader>
          <DialogTitle></DialogTitle>
          <DialogDescription></DialogDescription>
          <div className="w-full mt-3">
            <InputGroup className="w-full rounded-full h-11">
              <InputGroupInput
                type="search"
                placeholder="What you wanna drink today?"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <InputGroupAddon>
                <SearchIcon className="text-muted-foreground h-4 w-4" />
              </InputGroupAddon>
            </InputGroup>
          </div>
        </DialogHeader>
        <div className="no-scrollbar max-h-[80vh] overflow-y-auto p-4">
          {query === "" && results.length === 0 && (
            <ul>
              <li className="text-muted-foreground">
                Start typing a keyword above...
              </li>
            </ul>
          )}
          {query !== "" && results.length === 0 && !loading && (
            <ul className="flex flex-col gap-3">
              <li className="text-muted-foreground">
                No results for keyword &apos;{query}&apos;
              </li>
              <li>
                <Button
                  variant={"outline"}
                  size={"sm"}
                  onClick={handleButtonClick}
                  className="w-full font-medium rounded-full"
                >
                  Search anyway <ArrowRight />
                </Button>
              </li>
            </ul>
          )}
          {loading && (
            <ul>
              <li className="flex items-center justify-center gap-3">
                {" "}
                <Loader className="animate-spin" />
              </li>
            </ul>
          )}
          {!loading && results.length > 0 && (
            <ul className="flex flex-col gap-3">
              {results.map((r) => {
                return (
                  <li key={r.id}>
                    <SearchResultItem
                      product={r}
                      onClick={() => setOpen(false)}
                    />
                  </li>
                );
              })}
              <li>
                <Button
                  variant={"outline"}
                  size={"sm"}
                  onClick={handleButtonClick}
                  className="w-full font-medium rounded-full"
                >
                  See all results <ArrowRight />
                </Button>
              </li>
            </ul>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function SearchResultItem({
  product,
  onClick,
}: {
  product: Product;
  onClick?: () => void;
}) {
  return (
    <Link href={`/products/${product.slug}`} onClick={onClick}>
      <Card className="gap-0 p-0">
        <CardContent className="flex items-center p-3 gap-3">
          <div className="relative bg-accent/30 w-14 h-14 rounded">
            {product.image && (
              <Image
                src={product.image}
                blurDataURL={product.image}
                alt={product.title}
                fill={true}
                className={cn(
                  "object-cover",
                  product.stock !== 0 ? "" : "grayscale",
                )}
              />
            )}
          </div>
          <div>
            <div className="mb-1">
              <StockBadge stock={product.stock} />
            </div>
            <h2 className="truncate">{product.title}</h2>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
