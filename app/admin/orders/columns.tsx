"use client";

import { OrderActionCell } from "@/components/order/order-action-cell";
import { OrderStatusComponent } from "@/components/order/order-status";
import { Button } from "@/components/ui/button";
import {
  AdminOrderWithRelation,
  OrderPaymentStatus,
  OrderStatus,
} from "@/types/order.type";
import { formatDateTime } from "@/utils/order";

import { displayRupiah } from "@/utils/price";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import Link from "next/link";

export const columns: ColumnDef<AdminOrderWithRelation>[] = [
  {
    accessorKey: "order_number",
    header: ({ column }) => {
      return (
        <div className="flex items-center gap-2">
          Order Number
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            <ArrowUpDown className="h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <Link
          href={`/admin/orders/${row.original.id}`}
          className="hover:underline"
        >
          #{row.original.order_number}
        </Link>
      );
    },
  },

  {
    accessorFn: (row) => row.order_user?.full_name,
    id: "order_user",
    header: ({ column }) => {
      return (
        <div className="flex items-center gap-2">
          Customer Name
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            <ArrowUpDown className="h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ getValue }) => {
      const name = getValue() as string;
      return <div className="font-medium">{name || "Guest User"}</div>;
    },
  },

  {
    accessorKey: "total_amount",
    header: ({ column }) => {
      return (
        <div className="flex items-center gap-2">
          Total Amount
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            <ArrowUpDown className="h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const formatted = displayRupiah(row.original.total_amount);

      return <div className="font-medium">{formatted}</div>;
    },
  },

  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <div className="flex items-center gap-2">
          Status
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            <ArrowUpDown className="h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <OrderStatusComponent status={row.original.status as OrderStatus} />
      );
    },
  },

  {
    accessorKey: "payment_status",
    header: ({ column }) => {
      return (
        <div className="flex items-center gap-2">
          Payment Status
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            <ArrowUpDown className="h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <OrderStatusComponent
          status={row.original.payment_status as OrderPaymentStatus}
        />
      );
    },
  },

  {
    accessorKey: "created_at",
    header: ({ column }) => {
      return (
        <div className="flex items-center gap-2">
          Placed on
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            <ArrowUpDown className="h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      return formatDateTime(row.original.created_at);
    },
  },

  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <OrderActionCell row={row} />,
  },
];
