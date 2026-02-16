import { CustomerAction } from "@/components/order/customer-actiont";
import { OrderID } from "@/components/order/order-id";
import { OrderStatusComponent } from "@/components/order/order-status";
import { OrderTracking } from "@/components/order/order-tracking";
import { BreadcrumbComponent } from "@/components/private/breadcrumb";
import { Crumb } from "@/components/private/private-navbar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getOrderByIdWithRelations } from "@/service/order.service";
import {
  OrderPaymentStatus,
  OrderStatus,
  OrderWithRelation,
} from "@/types/order.type";
import { constructFullAddress } from "@/utils/address";
import { formatDateTime } from "@/utils/order";
import { displayRupiah } from "@/utils/price";
import { Clock, MapPin, CreditCard, Coffee, PhoneCall } from "lucide-react";
import Image from "next/image";

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
      <div className="col-span-3 flex gap-2 items-center">
        <h2 className="font-bold text-2xl">Order #{order.order_number}</h2>
        <OrderStatusComponent status={order.status as OrderStatus} />
      </div>
      <div className="col-span-3 flex flex-wrap gap-3 items-end justify-between">
        <div className="text-sm text-muted-foreground">
          <span className="mb-1 ">Order ID</span>
          <OrderID order={order} />
        </div>
        <span className="text-sm text-muted-foreground flex gap-1 items-center">
          {" "}
          <Clock size={14} /> Placed on {formatDateTime(order.created_at)}
        </span>
      </div>

      {/* MAIN INFO */}
      <div className="col-span-3 md:col-span-2 grid grid-cols-2 gap-5">
        {/* Tracking */}
        <OrderTracking order={order} />

        {/* Customer Action */}
        <CustomerAction order={order} />

        {/* Order Items */}
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Coffee className="size-4" />
              Order Items
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col divide-y">
            {order.order_items?.map((item) => (
              <div key={item.id} className="py-5 flex items-center gap-4">
                <div className="relative h-16 w-16 rounded-md bg-muted shrink-0 overflow-hidden">
                  {item.image && (
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{item.title}</p>
                  <p className="text-sm text-muted-foreground">
                    x {item.quantity} pcs
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium">
                    {displayRupiah(item.price * item.quantity)}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {displayRupiah(item.price)}/pcs
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Sidebar */}
      <div className="col-span-3 md:col-span-1 flex flex-col gap-5">
        {/* Shipping Address */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Shipping Address
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm space-y-1">
            <p className="font-medium">{address.full_name}</p>
            <p className="text-muted-foreground/70">{address.phone}</p>
            <p className="text-muted-foreground">
              {constructFullAddress(address)}
            </p>
          </CardContent>
        </Card>

        {/* Payment Details */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <CreditCard className="h-4 w-4" />
              Payment Details
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm flex flex-col gap-3">
            <div className="flex justify-between">
              <span className="font-medium">Payment Status</span>
              <OrderStatusComponent
                status={order.payment_status as OrderPaymentStatus}
              />
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Payment Method</span>
              <span className="capitalize">
                {order.payment_method?.replace("_", " ") || "Not specified"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Subtotal</span>
              <span className="flex items-center gap-2">
                <span>{order.order_items.length} Items</span>
                <span className="w-0.5 h-0.5 rounded-full bg-foreground"></span>
                {displayRupiah(order.total_amount)}
              </span>
            </div>
          </CardContent>
          <CardFooter className="border-t flex justify-between font-medium">
            <span>Total Amount</span>
            <span>{displayRupiah(order.total_amount)}</span>
          </CardFooter>
        </Card>

        {/* Contact */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <PhoneCall className="h-4 w-4" />
              Troubleshooting
            </CardTitle>
            <CardDescription>
              If you have any problem with you order, feel free to contact our
              admins.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-sm flex flex-col gap-3">
            <div className="flex justify-between">
              <span className="font-medium">Email</span>
              <span>admin@matte.com</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Whatsapp</span>
              <span>+62-878-7076-7752</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
