import { NavBreadcrumb } from "@/components/breadcrumb";
import { Crumb } from "@/components/private/private-navbar";
import { ProductDetail } from "@/components/products/product-detail";
import { getProductBySlug } from "@/service/product.service";
import { Product } from "@/types/product.type";

async function getSingleProduct(slug: string): Promise<Product> {
  const { data: product } = await getProductBySlug(slug);
  return product;
}

export default async function SingleProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = await getSingleProduct(slug);

  const crumbs: Crumb[] = [
    {
      label: "Products",
      href: "/products",
      isPage: false,
    },
    {
      label: p.title,
      href: `/products/${p.slug}`,
      isPage: true,
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-5">
      <div className="col-span-2 pt-12">
        <NavBreadcrumb crumbs={crumbs} />
      </div>
      <ProductDetail product={p} />
    </div>
  );
}
