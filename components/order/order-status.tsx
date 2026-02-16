import { formatStatus } from "@/utils/order";
import { Badge } from "../ui/badge";
import { OrderPaymentStatus, OrderStatus } from "@/types/order.type";

export function OrderStatusComponent({
  status,
}: {
  status: OrderStatus | OrderPaymentStatus;
}) {
  let variant = "outline";

  if (
    status === "request cancellation" ||
    status === "failed" ||
    status === "cancelled"
  ) {
    variant = "destructive";
  }

  return (
    <Badge
      variant={
        variant as
          | "outline"
          | "destructive"
          | "link"
          | "default"
          | "secondary"
          | "ghost"
          | null
          | undefined
      }
    >
      {formatStatus(status)}
    </Badge>
  );
}
