import { deleteProductById } from "@/service/product.service";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { MoreHorizontal, Pencil, Trash } from "lucide-react";
import { DeleteDialog } from "./delete-dialog";
import Link from "next/link";
import { Row } from "@tanstack/react-table";
import { ProductWithCategory } from "@/types/product.type";

export function ActionCell({ row }: { row: Row<ProductWithCategory> }) {
  const router = useRouter();

  const deleteFn = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await deleteProductById(row.original.id);
    router.refresh();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link
            href={`/admin/products/${row.original.id}/edit`}
            className="flex items-center gap-2"
          >
            <Pencil /> Update Data
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="text-destructive"
          onSelect={(e) => e.preventDefault()}
        >
          <DeleteDialog
            trigger={
              <div className="flex items-center gap-2">
                <Trash /> Delete Data
              </div>
            }
            deleteCallback={deleteFn}
          />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
