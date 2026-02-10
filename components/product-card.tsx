import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Product } from "@/types/product.type";
import { displayRupiah } from "@/utils/price";
import Link from "next/link";
import { StockBadge } from "./stock-badge";

export type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/products/${product.slug}`}>
      <Card className="col-span-1 overflow-hidden">
        <CardContent className="relative gap-0 p-0 overflow-hidden">
          <div className="relative col-span-2 aspect-[3/2] overflow-hidden">
            <Image
              src={product.image}
              blurDataURL={product.image}
              alt={product.title}
              fill={true}
              className="object-cover"
            />
          </div>
          <div className="p-5 space-y-1">
            <StockBadge stock={product.stock} />
            <h2
              className="text-lg tracking-tight line-clamp-1"
              title={product.title}
            >
              {product.title}
            </h2>
            <h1 className="font-bold tracking-tight text-primary">
              {displayRupiah(product.price)}
            </h1>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
