import { ProductCard } from "../product-card";
import { Product } from "@/types/product.type";
import { getProductsWithoutRelation } from "@/service/product.service";
import { Button } from "../ui/button";

async function getProductsBestSeller(): Promise<Product[]> {
  const { data: products } = await getProductsWithoutRelation();
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
        <Button variant={"ghost"}>See all</Button>
      </div>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {products.map((p, i) => {
          return <ProductCard key={i} product={p} />;
        })}
      </ul>
    </section>
  );
}
