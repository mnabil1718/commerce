import { ProductCard } from "../product-card";
import { Product } from "@/types/product.type";
import { getProductsWithoutRelation } from "@/service/product.service";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

async function getProductsBestSeller(): Promise<Product[]> {
  const { data: products } = await getProductsWithoutRelation({});
  return products;
}

export async function BestSellerSection() {
  const products = await getProductsBestSeller();
  return (
    <section id="best-seller" className="col-span-2">
      <div className="flex w-full justify-between">
        <h2 className="text-2xl font-bol tracking-tight font-medium mb-5">
          Best Sellers
        </h2>
        <Link href={"/products"}>
          <Button variant={"ghost"} className="group rounded-full">
            View all{" "}
            <ArrowRight className="group-hover:translate-x-1 transition-transform duration-200" />
          </Button>
        </Link>
      </div>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {products.map((p, i) => {
          return <ProductCard key={i} product={p} />;
        })}
      </ul>
    </section>
  );
}
