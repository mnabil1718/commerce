import { Crumb, PrivateNavbar } from "@/components/private/private-navbar";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { Category } from "@/types/category.type";
import { getProductCategories } from "@/service/category.service";

const crumbs: Crumb[] = [
  {
    label: "Categories",
    href: "/admin/categories",
    isPage: true,
  },
];

async function getData(): Promise<Category[]> {
  const { data: categories } = await getProductCategories();
  return categories;
}

export default async function CategoriesPage() {
  const data = await getData();

  return (
    <>
      <PrivateNavbar crumbs={crumbs} />
      <div className="flex flex-col gap-5 p-5">
        <h2 className="font-medium text-2xl">Categories</h2>
        <DataTable columns={columns} data={data} />
      </div>
    </>
  );
}
