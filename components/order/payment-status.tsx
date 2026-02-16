/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  Order,
  OrderPaymentStatus,
  OrderWithRelation,
} from "@/types/order.type";
import { OrderStatusComponent } from "./order-status";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { useState } from "react";
import { toast } from "sonner";

export function PaymentStatus({ order }: { order: Order }) {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  const pay = async () => {
    setLoading(true);
    try {
      // Trigger Snap Popup
      (window as any).snap.pay(order.snap_token, {
        onSuccess: (result: any) => {
          router.refresh();
        },
        onPending: (result: any) => {
          router.refresh();
        },
        onError: (result: any) => {
          toast.error(result.error_message);
        },
        onClose: () => {
          router.refresh();
        },
      });
    } catch (e: unknown) {
      if (e instanceof Error) {
        toast.error(e.message);
        return;
      }
      toast.error("Cannot process transaction");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {order.payment_status === "waiting payment" && (
        <div className="flex justify-between w-full">
          <Button
            size={"sm"}
            onClick={pay}
            className="font-medium rounded-full w-full"
          >
            Pay Now
          </Button>
        </div>
      )}

      <div className="flex justify-between">
        <span className="font-medium">Payment Status</span>
        <OrderStatusComponent
          status={order.payment_status as OrderPaymentStatus}
        />
      </div>
    </>
  );
}
