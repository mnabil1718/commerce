import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { MoreHorizontal, Pencil, Trash } from "lucide-react";
import { DeleteDialog } from "../delete-dialog";
import { Row } from "@tanstack/react-table";
import { useState } from "react";
import { Category } from "@/types/category.type";
import { deleteCategoryById } from "@/service/category.service";
import { UpdateCategoryDialog } from "./update-category-dialog";

export function CategoryActionCell({ row }: { row: Row<Category> }) {
  const router = useRouter();
  const [open, setOpen] = useState<boolean>(false);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const deleteFn = async (e: React.MouseEvent<HTMLButtonElement>) => {
    await deleteCategoryById(row.original.id);

    setOpen(false);

    setTimeout(() => {
      router.refresh();
    }, 500);
  };

  const updateFn = () => {
    setOpen(false);

    setTimeout(() => {
      router.refresh();
    }, 500);
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
          <UpdateCategoryDialog
            initialData={row.original}
            onUpdatedCallback={updateFn}
          >
            <Pencil className="h-4 w-4" /> Update Data
          </UpdateCategoryDialog>
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
