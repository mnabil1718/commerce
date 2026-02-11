import { Crumb, PrivateNavbar } from "@/components/private/private-navbar";
import { AdminAddProductForm } from "@/components/products/admin-add-product";
import { getProductCategories } from "@/service/category.service";

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

export default async function AddProductPage() {
  const { data: c } = await getProductCategories();

  return (
    <>
      <PrivateNavbar crumbs={crumbs} />
      <div className="max-w-3xl mx-auto">
        <div className="grid grid-cols-2 gap-5 p-5">
          <h2 className="col-span-2 font-medium text-2xl">Add New Product</h2>
          <AdminAddProductForm categories={c} />
        </div>
      </div>
    </>
  );
}
