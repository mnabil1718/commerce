import { Suspense } from "react";
import { AuthButton } from "./auth-button";
import { Brand } from "./brand";
import Link from "next/link";
import { Cart } from "./cart/cart";
import { Search } from "lucide-react";
import { SearchDialog } from "./search-dialog";
import { Button } from "./ui/button";

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 backdrop-blur bg-background/80 border-b">
      <div className="mx-auto max-w-5xl p-5 flex items-center justify-between">
        {/* Brand */}
        <Brand />

        <div className="hidden md:block">
          <SearchDialog>
            <div className="border border-border/70 rounded-full text-muted-foreground text-sm px-4 py-2 flex items-center gap-2">
              <Search className="size-4" />
              What do you wanna drink today?
            </div>
          </SearchDialog>
        </div>

        {/* Nav links */}
        <div className="flex items-center gap-4 md:gap-8 text-sm">
          <Link
            className="hidden md:block hover:text-muted-foreground/60 font-medium"
            href="/products"
          >
            Shop
          </Link>

          <div className="block md:hidden">
            <SearchDialog>
              <Button variant={"ghost"}>
                <Search className="size-4" />
              </Button>
            </SearchDialog>
          </div>

          <Suspense>
            <AuthButton />
          </Suspense>

          <Cart />
        </div>
      </div>
    </nav>
  );
}
