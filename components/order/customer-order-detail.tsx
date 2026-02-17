"use client";

import {
  OrderAddress,
  OrderStatus,
  OrderWithRelation,
} from "@/types/order.type";
import { OrderStatusComponent } from "./order-status";
import { OrderID } from "./order-id";
import { Clock, Coffee, CreditCard, MapPin, PhoneCall } from "lucide-react";
import { formatDateTime } from "@/utils/order";
import { useEffect, useRef, useState } from "react";
import { OrderTracking } from "./order-tracking";
import { CustomerAction } from "./customer-actiont";
import Image from "next/image";
import { displayRupiah } from "@/utils/price";
import { constructFullAddress } from "@/utils/address";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PaymentStatus } from "./payment-status";
import { createClient } from "@/lib/supabase/client";
import { RealtimeChannel } from "@supabase/supabase-js";
import { POSTGRES_CHANGES, PRIVATE_ORDERS_CHANNEL } from "@/constants/realtime";

export function CustomerOrderDetail({
  o,
  address,
}: {
  o: OrderWithRelation;
  address: OrderAddress;
}) {
  const supabase = createClient();
  const ref = useRef<RealtimeChannel | null>(null);
  const [order, setOrder] = useState<OrderWithRelation>(o);

  const subscription = () => {
    const ch = supabase.channel(PRIVATE_ORDERS_CHANNEL);

    ch.on(
      POSTGRES_CHANGES,
      {
        event: "UPDATE",
        schema: "public",
        table: "orders",
        filter: `id=eq.${order.id}`,
      },
      (payload) => {
        setOrder((prev) => ({
          ...prev,
          status: payload.new.status,
          snap_token: payload.new.snap_token,
          total_amount: payload.new.total_amount,
          payment_status: payload.new.payment_status,
          payment_method: payload.new.payment_method,
        }));
      },
    ).subscribe();

    return ch;
  };

  useEffect(() => {
    ref.current = subscription();

    return () => {
      ref.current?.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
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
      <div className="col-span-3 md:col-span-2 grid grid-cols-2 gap-5 h-fit">
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
      <div className="col-span-3 md:col-span-1 flex flex-col gap-5 h-fit">
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
            <PaymentStatus order={order} />

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
    </>
  );
}
