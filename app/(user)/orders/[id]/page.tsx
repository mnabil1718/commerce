import { BreadcrumbComponent } from "@/components/private/breadcrumb";
import { Crumb } from "@/components/private/private-navbar";
import { Badge } from "@/components/ui/badge";
import { getOrderByIdWithRelations } from "@/service/order.service";
import { OrderWithRelation } from "@/types/order.type";
import { formatStatus } from "@/utils/order";

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
      href: "/my-orders",
    },
    {
      label: "Order Detail",
      href: "#",
      isPage: true,
    },
  ];

  return (
    <div className="grid grid-cols-3 gap-5 p-5">
      <div className="col-span-3">
        <BreadcrumbComponent crumbs={crumbs} />
      </div>
      <div className="col-span-3 flex gap-2 items-center">
        <h2 className="font-bold text-2xl">Order Detail</h2>
        <Badge variant={"outline"}>{formatStatus(order.status)}</Badge>
      </div>
      <div className="col-span-2"></div>
      <div className="col-span-1"></div>
    </div>
  );
}
