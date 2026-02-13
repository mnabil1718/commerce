import { Suspense } from "react";
import { AuthButton } from "./auth-button";
import { Brand } from "./brand";
import { Search } from "./search";
import Link from "next/link";
import { Cart } from "./cart/cart";

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 backdrop-blur bg-background/80 border-b">
      <div className="mx-auto max-w-5xl p-5 flex items-center justify-between">
        {/* Brand */}
        <Brand />

        <Search />

        {/* Nav links */}
        <div className="hidden md:flex items-center gap-8 text-sm">
          <Link
            className="hover:text-muted-foreground/60 transition"
            href="/products"
          >
            Shop
          </Link>

          {/* <a
            className="hover:text-muted-foreground/60 transition"
            href="/about"
          >
            About
          </a> */}
          <Suspense>
            <AuthButton />
          </Suspense>

          <Cart />
        </div>
      </div>
    </nav>
  );
}
