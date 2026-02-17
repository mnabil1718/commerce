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
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus, SearchIcon } from "lucide-react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  POSTGRES_CHANGES,
  PUBLIC_PRODUCTS_CHANNEL,
} from "@/constants/realtime";
import { Product, ProductWithCategory } from "@/types/product.type";
import { Category } from "@/types/category.type";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createClient } from "@/lib/supabase/client";
import { RealtimeChannel } from "@supabase/supabase-js";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  categories?: Category[];
}

export function DataTable<TData extends Product, TValue>({
  columns,
  data,
  categories = [],
}: DataTableProps<TData, TValue>) {
  const supabase = createClient();
  const ref = useRef<RealtimeChannel | null>(null);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [tableData, setTableData] = useState<TData[]>(data);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );

  const subscription = () => {
    const ch = supabase.channel(PUBLIC_PRODUCTS_CHANNEL);

    ch.on(
      POSTGRES_CHANGES,
      {
        event: "*",
        schema: "public",
        table: "products",
      },
      async (payload) => {
        if (payload.eventType === "INSERT" || payload.eventType === "UPDATE") {
          // fetch the full row with category
          const { data } = await supabase
            .from("products")
            .select(`*, category:categories (*)`)
            .eq("id", payload.new.id)
            .single();

          if (!data) return;

          const product = data as unknown as ProductWithCategory;

          if (payload.eventType === "INSERT") {
            setTableData((prev) => [product as unknown as TData, ...prev]);
          }

          if (payload.eventType === "UPDATE") {
            setTableData((prev) =>
              prev.map((row) =>
                row.id === product.id ? (product as unknown as TData) : row,
              ),
            );
          }
        }

        if (payload.eventType === "DELETE") {
          setTableData((prev) =>
            prev.filter((row) => row.id !== (payload.old as TData).id),
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
            placeholder="Search product title..."
            value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("title")?.setFilterValue(event.target.value)
            }
          />
          <InputGroupAddon>
            <SearchIcon />
          </InputGroupAddon>
        </InputGroup>

        <div className="flex items-center gap-3">
          {/*  Category Filter */}
          <Select
            value={
              (table.getColumn("category")?.getFilterValue() as string) ?? "all"
            }
            onValueChange={(value) => {
              table
                .getColumn("category")
                ?.setFilterValue(value === "all" ? "" : value);
            }}
          >
            <SelectTrigger className="w-45">
              <SelectValue placeholder="Filter Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((c) => (
                <SelectItem key={c.id} value={String(c.id)}>
                  {c.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Add Button */}
          <Link href={"/admin/products/add"}>
            <Button variant={"outline"}>
              <Plus />
              Add New Product
            </Button>
          </Link>
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
