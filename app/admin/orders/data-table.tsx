"use client";

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React, { useEffect, useRef, useState } from "react";
import { SearchIcon } from "lucide-react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createClient } from "@/lib/supabase/client";
import { RealtimeChannel } from "@supabase/supabase-js";
import { POSTGRES_CHANGES, PRIVATE_ORDERS_CHANNEL } from "@/constants/realtime";
import { Order } from "@/types/order.type";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData extends Order, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const supabase = createClient();
  const ref = useRef<RealtimeChannel | null>(null);
  const [tableData, setTableData] = useState<TData[]>(data);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );

  const subscription = () => {
    const ch = supabase.channel(PRIVATE_ORDERS_CHANNEL);

    ch.on(
      POSTGRES_CHANGES,
      {
        event: "*",
        schema: "public",
        table: "orders",
      },
      async (payload) => {
        if (payload.eventType === "DELETE") {
          setTableData((prev) =>
            prev.filter((row) => row.id !== payload.old.id),
          );
          return;
        }

        const { data: enrichedOrder, error } = await supabase
          .from("orders")
          .select(
            `
          *,
          order_user:profiles (*),
          order_items (*),
          order_addresses (*)
        `,
          )
          .eq("id", payload.new.id)
          .single();

        if (error || !enrichedOrder) {
          return;
        }

        if (payload.eventType === "INSERT") {
          setTableData((prev) => [enrichedOrder as unknown as TData, ...prev]);
        }

        if (payload.eventType === "UPDATE") {
          setTableData((prev) =>
            prev.map((row) =>
              row.id === enrichedOrder.id
                ? (enrichedOrder as unknown as TData)
                : row,
            ),
          );
        }
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

  const table = useReactTable({
    data: tableData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  return (
    <div>
      <div className="w-full justify-between flex items-center py-4">
        <InputGroup className="max-w-72">
          <InputGroupInput
            type="search"
            placeholder="Search customer name..."
            value={
              (table.getColumn("order_user")?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table.getColumn("order_user")?.setFilterValue(event.target.value)
            }
          />
          <InputGroupAddon>
            <SearchIcon />
          </InputGroupAddon>
        </InputGroup>

        <div
          className="flex items-center gap-3
        \"
        >
          {/* Status Filter */}
          <Select
            value={
              (table.getColumn("status")?.getFilterValue() as string) ?? "all"
            }
            onValueChange={(value) => {
              table
                .getColumn("status")
                ?.setFilterValue(value === "all" ? "" : value);
            }}
          >
            <SelectTrigger className="w-45">
              <SelectValue placeholder="Filter Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="unfulfilled">Unfulfilled</SelectItem>
              <SelectItem value="shipping">Shipping</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
              <SelectItem value="request cancellation">
                Request Cancellation
              </SelectItem>
            </SelectContent>
          </Select>

          {/* Payment Status Filter */}
          <Select
            value={
              (table.getColumn("payment_status")?.getFilterValue() as string) ??
              "all"
            }
            onValueChange={(value) => {
              table
                .getColumn("payment_status")
                ?.setFilterValue(value === "all" ? "" : value);
            }}
          >
            <SelectTrigger className="w-45">
              <SelectValue placeholder="Filter Payment Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Payment Status</SelectItem>
              <SelectItem value="waiting payment">Waiting Payment</SelectItem>
              <SelectItem value="paid">Paid</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="failed">Failed</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
