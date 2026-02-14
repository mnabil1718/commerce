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
import { useAuthStore } from "@/providers/auth.provider";
import { useRouter } from "next/navigation";
import { EmptyCoffee } from "../empty-coffee";

export function CartSheet({ children }: { children: React.ReactNode }) {
  const store = useStore(useCartStore, (state) => state);
  const user = useAuthStore((state) => state.user);
  const router = useRouter();

  if (!store) {
    return null;
  }

  const checkout = () => {
    if (!user) {
      router.push(`/auth/login?intent=${encodeURIComponent("/checkout")}`);
      return;
    }

    router.push(`/checkout`);
  };

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
            <div className="flex-1 flex flex-col gap-5 items-center justify-center text-center text-muted-foreground">
              <EmptyCoffee />
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
              <Button
                onClick={checkout}
                type="submit"
                className="font-semibold"
              >
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
