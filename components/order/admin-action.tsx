"use client";

import { Order } from "@/types/order.type";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { updateOrder, updateOrderAsServiceRole } from "@/service/order.service";
import { Info, MousePointer2 } from "lucide-react";
import { DeleteDialog } from "../delete-dialog";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { useState } from "react";

export function AdminAction({ order }: { order: Order }) {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  const cancel = async () => {
    setLoading(true);
    await updateOrderAsServiceRole({ ...order, status: "cancelled" });
    router.refresh();
    setLoading(false);
  };

  const ship = async () => {
    setLoading(true);
    await updateOrder({ ...order, status: "shipping" });
    router.refresh();
    setLoading(false);
  };

  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MousePointer2 className="size-4" />
          Administrator Actions
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-wrap justify-between text-sm gap-3">
        <div className="flex w-fit items-center gap-2">
          <DeleteDialog
            text="This action will request order cancellation to our admins. You will have to wait for it to be approved."
            buttonText="Cancel Order"
            deleteCallback={cancel}
            trigger={
              <Button
                variant={"destructive"}
                disabled={order.status !== "request cancellation" || loading}
              >
                {loading ? "Processing..." : "Cancel Order"}
              </Button>
            }
          />

          <Tooltip>
            <TooltipTrigger>
              <Info size={16} />
            </TooltipTrigger>
            <TooltipContent>
              <p>
                This action is enabled only if
                <br />
                customer request cancellation
              </p>
            </TooltipContent>
          </Tooltip>
        </div>
        <Button
          onClick={ship}
          disabled={order.status !== "unfulfilled" || loading}
        >
          {loading ? "Processing..." : "Mark As Shipping"}
        </Button>
      </CardContent>
    </Card>
  );
}
