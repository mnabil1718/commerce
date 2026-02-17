import { CustomerOrderDetail } from "@/components/order/customer-order-detail";
import { BreadcrumbComponent } from "@/components/private/breadcrumb";
import { Crumb } from "@/components/private/private-navbar";
import { getOrderByIdWithRelations } from "@/service/order.service";
import { OrderWithRelation } from "@/types/order.type";

async function getOrder(id: string): Promise<OrderWithRelation> {
  const { data: order } = await getOrderByIdWithRelations(id);
  if (!order) throw new Error("Order not found");
  return order;
}

export default async function OrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const order = await getOrder(id);
  const address = order.order_addresses[0];

  const crumbs: Crumb[] = [
    {
      label: "My Orders",
      isPage: false,
      href: "/orders",
    },
    {
      label: `Order #${order.order_number}`,
      href: "#",
      isPage: true,
    },
  ];

  return (
    <div className="grid grid-cols-3 gap-5">
      <div className="col-span-3">
        <BreadcrumbComponent crumbs={crumbs} />
      </div>
      <CustomerOrderDetail o={order} address={address} />
    </div>
  );
}
