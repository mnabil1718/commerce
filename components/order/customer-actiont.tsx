"use client";

import { Order } from "@/types/order.type";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Info, MousePointer2 } from "lucide-react";
import { Button } from "../ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { updateOrder } from "@/service/order.service";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { DeleteDialog } from "../delete-dialog";
import { ConfirmDialog } from "../confirm-dialog";

export function CustomerAction({ order }: { order: Order }) {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  const requestCancel = async () => {
    setLoading(true);
    await updateOrder({ ...order, status: "request cancellation" });
    router.refresh();
    setLoading(false);
  };

  const requestComplete = async () => {
    setLoading(true);
    await updateOrder({ ...order, status: "completed" });
    router.refresh();
    setLoading(false);
  };

  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MousePointer2 className="size-4" />
          Customer Actions
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-wrap justify-between text-sm gap-3">
        <div className="flex w-fit items-center gap-2">
          <DeleteDialog
            text="This action will request order cancellation to our admins. You will have to wait for it to be approved."
            buttonText="Send Request"
            deleteCallback={requestCancel}
            trigger={
              <Button
                className="px-0 text-foreground"
                variant={"link"}
                disabled={order.status !== "unfulfilled" || loading}
              >
                {loading ? "Processing..." : "Request Cancellation"}
              </Button>
            }
          />

          <Tooltip>
            <TooltipTrigger>
              <Info size={16} />
            </TooltipTrigger>
            <TooltipContent>
              <p>
                You can only request cancellation <br />
                before we shipped your order
              </p>
            </TooltipContent>
          </Tooltip>
        </div>
        <ConfirmDialog
          confirmCallback={requestComplete}
          buttonText="Confirm"
          text="This action will update order status to completed. Make sure you already received your products. Do you wish to continue?"
          trigger={
            <Button disabled={order.status !== "shipping" || loading}>
              {loading ? "Processing..." : "Complete Order"}
            </Button>
          }
        />
      </CardContent>
    </Card>
  );
}
