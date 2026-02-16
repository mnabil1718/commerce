/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  OrderPaymentStatus,
  OrderStatus,
  OrderWithRelation,
} from "@/types/order.type";
import { EmptyOrders } from "../empty-orders";
import Link from "next/link";
import { Button } from "../ui/button";
import { MyOrderItem } from "./my-order-item";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useState, useMemo } from "react";

const statuses: Array<OrderStatus | OrderPaymentStatus | "all status"> = [
  "all status",
  "unfulfilled",
  "shipping",
  "request cancellation",
  "completed",
  "cancelled",
  "failed",
  "paid",
  "pending",
  "waiting payment",
];

type SortOption = "newest" | "oldest" | "priciest" | "cheapest";

export function MyOrderList({ orders }: { orders: OrderWithRelation[] }) {
  const [status, setStatus] = useState<
    OrderStatus | OrderPaymentStatus | "all status"
  >("all status");
  const [sortBy, setSortBy] = useState<SortOption>("newest");

  const processedOrders = useMemo(() => {
    const result =
      status === "all status"
        ? [...orders]
        : orders.filter(
            (o) => o.status === status || o.payment_status === status,
          );

    return result.sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return (
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
          );
        case "oldest":
          return (
            new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
          );
        case "priciest":
          return b.total_amount - a.total_amount;
        case "cheapest":
          return a.total_amount - b.total_amount;
        default:
          return 0;
      }
    });
  }, [status, sortBy, orders]);

  if (orders.length === 0) {
    return (
      <div className="w-full flex flex-col items-center justify-center min-h-72 gap-5">
        <EmptyOrders />
        <span className="text-muted-foreground">You have no orders</span>
        <Link href="/products">
          <Button className="font-medium rounded-full">
            Choose your drinks
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-wrap justify-between items-end">
        <Select value={status} onValueChange={(val) => setStatus(val as any)}>
          <SelectTrigger className="w-50 capitalize">
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {statuses.map((s) => (
                <SelectItem key={s} value={s} className="capitalize">
                  {s}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as SortOption)}
          className="text-sm bg-transparent font-medium outline-none"
        >
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
          <option value="priciest">Priciest</option>
          <option value="cheapest">Cheapest</option>
        </select>
      </div>

      {processedOrders.length > 0 ? (
        processedOrders.map((order) => (
          <MyOrderItem key={order.id} order={order} />
        ))
      ) : (
        <div className="text-center py-10 text-muted-foreground">
          No orders found with status {status}
        </div>
      )}
    </>
  );
}
