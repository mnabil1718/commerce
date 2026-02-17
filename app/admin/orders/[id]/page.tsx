import { AdminOrderDetail } from "@/components/order/admin-order-detail";
import { Crumb, PrivateNavbar } from "@/components/private/private-navbar";

import { getOrderWithRelationByIdAsServiceRoleForAdmin } from "@/service/order.service";

export default async function OrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { data: order } =
    await getOrderWithRelationByIdAsServiceRoleForAdmin(id);
  const address = order.order_addresses[0];

  const crumbs: Crumb[] = [
    {
      label: "Orders",
      href: "/admin/orders",
      isPage: false,
    },
    {
      label: `Order #${order.order_number}`,
      href: "",
      isPage: true,
    },
  ];

  return (
    <>
      <PrivateNavbar crumbs={crumbs} />
      <div className="max-w-5xl mx-auto">
        <AdminOrderDetail server_order={order} address={address} />
      </div>
    </>
  );
}
