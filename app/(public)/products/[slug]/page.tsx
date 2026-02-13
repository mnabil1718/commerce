import { NavBreadcrumb } from "@/components/breadcrumb";
import { Crumb } from "@/components/private/private-navbar";
import { AddCart } from "@/components/products/add-cart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
    <div className="grid grid-cols-2 gap-5">
      <div className="col-span-2 pt-12">
        <NavBreadcrumb crumbs={crumbs} />
      </div>
      <div className="col-span-2 md:col-span-1 flex flex-col gap-5">
        <Card className="relative p-0 gap-0 h-full aspect-3/2 overflow-hidden">
          {p.image && (
            <Image
              src={p.image}
              alt={p.title}
              fill
              className="w-full h-full object-cover"
            />
          )}
        </Card>
      </div>
      <div className="col-span-2 md:col-span-1 flex flex-col gap-5">
        <Card className="flex flex-col flex-1 ">
          <CardHeader>
            <CardTitle>Product Details</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-5">
            <h1 className="text-3xl font-medium">{p.title}</h1>
            <h2 className="font-semibold text-3xl tracking-tight text-primary">
              {displayRupiah(p.price)}
            </h2>
            <div className="w-fit relative flex items-stretch">
              Stock: {p.stock}
            </div>
            <AddCart product={p} />
          </CardContent>
        </Card>
      </div>
      <div className="col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>Product Description</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-5">
            <p className="whitespace-pre-line leading-relaxed">
              {p.description}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
