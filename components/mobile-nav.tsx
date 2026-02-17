"use client";

import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { useState } from "react";

export function MobileNav({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="p-6">
        <SheetHeader>
          <SheetTitle></SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetHeader>
        <span className="text-muted-foreground/80 font-medium text-sm">
          Menu
        </span>
        <ul className="text-lg font-medium">
          <li>
            <Link href={`/products`} onClick={() => setOpen(false)}>
              Shop
            </Link>
          </li>
        </ul>
      </SheetContent>
    </Sheet>
  );
}
