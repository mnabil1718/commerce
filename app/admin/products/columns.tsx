"use client";

import { ActionCell } from "@/components/action-cell";
import { Badge } from "@/components/ui/badge";

import { ProductWithCategory } from "@/types/product.type";
import { displayRupiah } from "@/utils/price";

import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";

export const columns: ColumnDef<ProductWithCategory>[] = [
  {
    accessorKey: "image",
    header: "Thumbnail",
    cell: ({ row }) => {
      const image: string | null = row.getValue("image");
      const title: string = row.getValue("title");
      return (
        <div className="relative w-20 aspect-square bg-secondary/20 rounded-lg overflow-hidden">
          {image && (
            <Image
              src={image}
              alt={title}
              fill
              className="w-full h-full object-cover"
            />
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
    header: "Stock",
  },

  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => {
      const price = Number(row.getValue("price"));
      const formatted = displayRupiah(price);

      return <div className="font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "created_at",
    header: "Created at",
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
    cell: ({ row }) => <ActionCell row={row} />,
  },
];
