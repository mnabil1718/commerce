import { deleteProductById } from "@/service/product.service";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { MoreHorizontal, Pencil, Trash } from "lucide-react";
import { DeleteDialog } from "./delete-dialog";
import Link from "next/link";
import { Row } from "@tanstack/react-table";
import { ProductWithCategory } from "@/types/product.type";
import { useState } from "react";

export function ActionCell({ row }: { row: Row<ProductWithCategory> }) {
  const router = useRouter();
  const [open, setOpen] = useState<boolean>(false);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const deleteFn = async (e: React.MouseEvent<HTMLButtonElement>) => {
    await deleteProductById(row.original.id);

    setOpen(false);
    router.refresh();
  };

  return (
    // 3. Pass open and onOpenChange to the DropdownMenu
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
            href={`/admin/products/${row.original.id}/edit`}
            className="flex items-center gap-2"
          >
            <Pencil className="h-4 w-4" /> Update Data
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem
          className="text-destructive"
          onSelect={(e) => e.preventDefault()}
        >
          <DeleteDialog
            trigger={
              <div className="flex w-full items-center gap-2">
                <Trash className="h-4 w-4" /> Delete Data
              </div>
            }
            deleteCallback={deleteFn}
          />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
