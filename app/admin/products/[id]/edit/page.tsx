import { Crumb, PrivateNavbar } from "@/components/private/private-navbar";
import { AdminEditProductForm } from "@/components/products/admin-edit-product";
import { getProductById } from "@/service/product.service";

const crumbs: Crumb[] = [
  {
    label: "Products",
    href: "/admin/products",
    isPage: false,
  },
  {
    label: " Add Products",
    href: "",
    isPage: true,
  },
];

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const { id } = await params;
  const { data: p } = await getProductById(id);

  return (
    <>
      <PrivateNavbar crumbs={crumbs} />
      <div className="max-w-3xl mx-auto">
        <div className="grid grid-cols-2 gap-5 p-5">
          <h2 className="col-span-2 font-medium text-2xl">Edit Product</h2>
          <AdminEditProductForm initialData={p} />
        </div>
      </div>
    </>
  );
}
