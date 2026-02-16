"use client";

import { ProductActionCell } from "@/components/products/product-action-cell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { ProductWithCategory } from "@/types/product.type";
import { displayRupiah } from "@/utils/price";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import Image from "next/image";

export const columns: ColumnDef<ProductWithCategory>[] = [
  {
    accessorKey: "image",
    header: "Thumbnail",
    cell: ({ row }) => {
      const image: string | null = row.getValue("image");
      const title: string = row.getValue("title");
      return (
        <div className="relative w-20 h-20 bg-secondary/20 rounded-lg overflow-hidden flex items-center justify-center">
          {image && (
            <Image src={image} alt={title} fill className="object-cover" />
          )}
        </div>
      );
    },
  },

  {
    accessorKey: "title",
    header: "Title",
  },

  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => {
      const category = row.original.category;

      return <Badge variant="outline">{category?.title ?? "-"}</Badge>;
    },
  },
  {
    accessorKey: "stock",
    header: ({ column }) => {
      return (
        <div className="flex items-center gap-2">
          Stock
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            <ArrowUpDown className="h-4 w-4" />
          </Button>
        </div>
      );
    },
  },

  {
    accessorKey: "price",
    header: ({ column }) => {
      return (
        <div className="flex items-center gap-2">
          Price
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
      const price = Number(row.getValue("price"));
      const formatted = displayRupiah(price);

      return <div className="font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "created_at",
    header: ({ column }) => {
      return (
        <div className="flex items-center gap-2">
          Created At
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
      const dateValue = row.getValue("created_at");

      if (!dateValue) return "-";

      const date = new Date(dateValue as string);

      return new Intl.DateTimeFormat("id-ID", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }).format(date);
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <ProductActionCell row={row} />,
  },
];
