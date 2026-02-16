"use client";

import { AdminOrderWithRelation } from "@/types/order.type";
import { Row } from "@tanstack/react-table";
import { useRouter } from "next/navigation";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useState } from "react";
import { Button } from "../ui/button";
import { ExternalLink, MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { ConfirmDialog } from "../confirm-dialog";
import { DeleteDialog } from "../delete-dialog";
import { updateOrderAsServiceRole } from "@/service/order.service";

export function OrderActionCell({ row }: { row: Row<AdminOrderWithRelation> }) {
  const [open, setOpen] = useState<boolean>(false);
  const router = useRouter();

  const updateStatus = async (status: string) => {
    await updateOrderAsServiceRole({ ...row.original, status });

    setOpen(false);
    router.refresh();
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>

        <DropdownMenuItem asChild>
          <Link
            href={`/admin/orders/${row.original.id}`}
            className="flex items-center gap-2"
          >
            <ExternalLink className="h-4 w-4" /> View Detail
          </Link>
        </DropdownMenuItem>
        <DropdownMenuGroup>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Quick Action</DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                {row.original.status !== "unfulfilled" &&
                  row.original.status !== "request cancellation" && (
                    <DropdownMenuItem>
                      No Quick action available
                    </DropdownMenuItem>
                  )}
                {row.original.status === "unfulfilled" && (
                  <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                    <ConfirmDialog
                      trigger={<span>Mark As Shipping</span>}
                      confirmCallback={() => updateStatus("shipping")}
                    />
                  </DropdownMenuItem>
                )}
                {row.original.status === "request cancellation" && (
                  <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                    <DeleteDialog
                      trigger={
                        <span className="text-destructive">Cancel Order</span>
                      }
                      deleteCallback={() => updateStatus("cancelled")}
                    />
                  </DropdownMenuItem>
                )}
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
