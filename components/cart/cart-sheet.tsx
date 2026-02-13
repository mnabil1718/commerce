"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { CartItemComponent } from "./cart-item";
import { useCartStore } from "@/providers/cart.provider";
import useStore from "@/hooks/use-store";
import { displayRupiah } from "@/utils/price";

export function CartSheet({ children }: { children: React.ReactNode }) {
  const store = useStore(useCartStore, (state) => state);

  if (!store) {
    return null;
  }

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>

      <SheetContent className="w-full sm:max-w-[30vw] p-5 rounded-tl-2xl rounded-bl-2xl flex flex-col">
        <SheetHeader>
          <SheetTitle>Review Your Picks</SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetHeader>

        <ul className="min-h-75 flex-1 flex flex-col items-stretch gap-3">
          {store.items.length === 0 && (
            <div className="flex-1 flex items-center justify-center text-center text-muted-foreground">
              No items found
            </div>
          )}
          {store.items.length > 0 &&
            store.items.map((item) => (
              <CartItemComponent key={item.product_id} item={item} />
            ))}
        </ul>
        {store.items.length > 0 && (
          <div className="px-5 flex items-center justify-between font-semibold">
            <span>Total</span>
            <span>{displayRupiah(store.getTotalPrice())}</span>
          </div>
        )}
        <SheetFooter className="mt-auto">
          {store.items.length > 0 && (
            <>
              <Button type="submit" className="font-semibold">
                Checkout
              </Button>
              <SheetClose asChild>
                <Button variant="outline">Cancel</Button>
              </SheetClose>
            </>
          )}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
