import { OrderStatus, OrderWithRelation } from "@/types/order.type";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { OrderStatusComponent } from "./order-status";
import { formatDateTime } from "@/utils/order";
import { Clock } from "lucide-react";
import Image from "next/image";
import { displayRupiah } from "@/utils/price";
import { Button } from "../ui/button";
import Link from "next/link";

export function MyOrderItem({ order }: { order: OrderWithRelation }) {
  const firstItem = order.order_items[0];
  return (
    <Card>
      <CardHeader className="border-b pb-0 gap-0">
        <div className="flex flex-wrap w-full items-start justify-between">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <CardTitle>Order #{order.order_number}</CardTitle>
              <OrderStatusComponent status={order.status as OrderStatus} />
            </div>
            <span className="flex items-center gap-1 text-sm text-muted-foreground">
              <Clock className="size-4" />
              {formatDateTime(order.created_at)}
            </span>
          </div>
          <Link href={`/orders/${order.id}`}>
            <Button variant={"ghost"}>View Detail</Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-5">
          <div className="relative overflow-hidden w-16 h-16 rounded-md bg-muted/50">
            {firstItem.image && (
              <Image
                src={firstItem.image}
                alt={firstItem.title}
                fill
                className="object-cover"
              />
            )}
          </div>
          <div className="flex-1">
            <h2 className="line-clamp-1 text-lg font-medium">
              {firstItem.title}
            </h2>
            <span className="text-muted-foreground text-sm">
              Total of {order.order_items.length} items
            </span>
          </div>
          <div className="flex flex-col">
            <p className="text-sm">Total Amount</p>
            <h2 className="font-medium">{displayRupiah(order.total_amount)}</h2>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
