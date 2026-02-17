import { ProductFilter } from "@/components/product-filter";
import { ProductCatelogGrid } from "@/components/products/catalog-grid";
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

      <ProductCatelogGrid products={p} />
    </div>
  );
}
