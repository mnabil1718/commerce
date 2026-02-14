import { ProductCard } from "@/components/product-card";
import { ProductFilter } from "@/components/product-filter";
import { ProductSort } from "@/components/products/product-sort";
import { getProductCategories } from "@/service/category.service";
import {
  getProductPriceRange,
  getProductsWithoutRelation,
} from "@/service/product.service";

export async function getFilterData() {
  const { min, max } = await getProductPriceRange();
  const { data: c } = await getProductCategories();

  return { min, max, c };
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: {
    q?: string;
    min?: string;
    max?: string;
    sort?: string;
    category?: string;
  };
}) {
  const params = await searchParams;

  const low = Number(params.min) || 0;
  const high = Number(params.max) || undefined;
  const ca = Number(params.category) || undefined;
  const sort = params.sort || "newest";
  const q = params.q?.trim() || undefined;

  const { data: p } = await getProductsWithoutRelation({
    min: low,
    max: high,
    category: ca,
    sort,
    q,
  });
  const { min, max, c } = await getFilterData();

  return (
    <div className="grid grid-cols-3 gap-5 py-10">
      {/* Filter */}
      <aside className="relative col-span-3 md:col-span-1 gap-5">
        <ProductFilter min={min} max={max} categories={c} />
      </aside>

      {/* Product Grid */}
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
    </div>
  );
}
