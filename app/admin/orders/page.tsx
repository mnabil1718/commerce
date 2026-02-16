import { Crumb, PrivateNavbar } from "@/components/private/private-navbar";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { AdminOrderWithRelation } from "@/types/order.type";
import { getOrdersWithRelationAsServiceRoleForAdmin } from "@/service/order.service";

const crumbs: Crumb[] = [
  {
    label: "Orders",
    href: "/admin/orders",
    isPage: true,
  },
];

async function getData(): Promise<AdminOrderWithRelation[]> {
  const { data: orders } = await getOrdersWithRelationAsServiceRoleForAdmin();
  return orders;
}

export default async function OrdersPage() {
  const data = await getData();

  return (
    <>
      <PrivateNavbar crumbs={crumbs} />
      <div className="flex flex-col gap-5 p-5">
        <h2 className="font-medium text-2xl">Orders</h2>
        <DataTable columns={columns} data={data} />
      </div>
    </>
  );
}
