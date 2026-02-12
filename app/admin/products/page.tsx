import { Crumb, PrivateNavbar } from "@/components/private/private-navbar";
import { getProducts } from "@/service/product.service";
import { ProductWithCategory } from "@/types/product.type";
import { DataTable } from "./data-table";
import { columns } from "./columns";

const crumbs: Crumb[] = [
  {
    label: "Products",
    href: "/admin/products",
    isPage: true,
  },
];

async function getData(): Promise<ProductWithCategory[]> {
  const { data: products } = await getProducts();
  return products;
}

export default async function ProductsPage() {
  const data = await getData();

  return (
    <>
      <PrivateNavbar crumbs={crumbs} />
      <div className="flex flex-col gap-5 p-5">
        <h2 className="font-medium text-2xl">Products</h2>
        <DataTable columns={columns} data={data} />
      </div>
    </>
  );
}
