import { NavBreadcrumb } from "@/components/breadcrumb";
import { Crumb } from "@/components/private/private-navbar";
import { Quantity } from "@/components/quantity";
import { Card, CardContent } from "@/components/ui/card";
import { PublicLayout } from "@/layouts/public";
import { getProductBySlug } from "@/service/product.service";
import { Product } from "@/types/product.type";
import { displayRupiah } from "@/utils/price";
import Image from "next/image";

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
    <PublicLayout>
      <div className="grid grid-cols-2 gap-5">
        <div className="col-span-2 pt-12">
          <NavBreadcrumb crumbs={crumbs} />
        </div>
        <aside className="col-span-2 md:col-span-1">
          <Card className="p-0 gap-0 border-none">
            <CardContent className="relative aspect-3/2 bg-secondary/20 rounded-lg overflow-hidden p-0">
              {p.image && (
                <Image
                  src={p.image}
                  alt={p.title}
                  fill
                  className="w-full object-contain"
                />
              )}
            </CardContent>
          </Card>
        </aside>
        <main className="col-span-2 md:col-span-1 flex flex-col gap-5">
          <h1 className="text-3xl font-medium">{p.title}</h1>
          <h2 className="font-semibold text-3xl tracking-tight text-primary">
            {displayRupiah(p.price)}
          </h2>
          <Quantity />
          <p>{p.description}</p>
        </main>
      </div>
    </PublicLayout>
  );
}
