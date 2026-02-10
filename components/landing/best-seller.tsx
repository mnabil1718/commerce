import { products } from "@/mock/products";
import { ProductCard } from "../product-card";

export function BestSellerSection() {
  return (
    <section id="best-seller" className="col-span-2">
      <h2 className="text-2xl font-bol tracking-tight font-medium mb-5">
        Best Sellers
      </h2>
      <ul className="grid grid-cols-3 gap-5">
        {products.map((p, i) => {
          return <ProductCard key={i} product={p} />;
        })}
      </ul>
    </section>
  );
}
