import {
  CircleCheck,
  CircleDot,
  Loader,
  LucideIcon,
  Truck,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Order } from "@/types/order.type";
import { cn } from "@/lib/utils";

export type TrackingItem = {
  icon: LucideIcon;
  label: string;
  isActive: boolean;
};

export function OrderTracking({ order }: { order: Order }) {
  const items: TrackingItem[] = [
    {
      label: "Preparing",
      icon: Loader,
      isActive: order.status === "unfulfilled",
    },
    {
      label: "Shipping",
      icon: Truck,
      isActive: order.status === "shipping",
    },
    {
      label: "Delivered",
      icon: CircleCheck,
      isActive: order.status === "completed",
    },
  ];

  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CircleDot className="size-4" />
          Status
        </CardTitle>
        <CardContent className="grid grid-cols-3 text-sm gap-1">
          {items.map((item, idx) => {
            return <OrderTrackingItem key={idx} item={item} />;
          })}
        </CardContent>
      </CardHeader>
    </Card>
  );
}

export function OrderTrackingItem({ item }: { item: TrackingItem }) {
  return (
    <div
      className={cn(
        "col-span-1 py-3",
        item.isActive
          ? "opacity-100 font-semibold"
          : "opacity-50 text-muted-foreground",
      )}
    >
      <span className="mb-2 flex items-center gap-1">
        <item.icon className="size-4" />
        <span className="truncate">{item.label}</span>
      </span>
      <div className="w-full border-b-4"></div>
    </div>
  );
}
