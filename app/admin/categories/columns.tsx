"use client";

import { CategoryActionCell } from "@/components/categories/category-action-cell";
import { Button } from "@/components/ui/button";
import { Category } from "@/types/category.type";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import Image from "next/image";

export const columns: ColumnDef<Category>[] = [
  {
    accessorKey: "image",
    header: "Thumbnail",
    cell: ({ row }) => {
      const image: string | null = row.getValue("image");
      const title: string = row.getValue("title");
      return (
        <div className="relative w-20 h-20 aspect-square bg-secondary/20 rounded-lg overflow-hidden">
          {image && (
            <Image src={image} alt={title} className="object-cover" fill />
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
    cell: ({ row }) => <CategoryActionCell row={row} />,
  },
];
