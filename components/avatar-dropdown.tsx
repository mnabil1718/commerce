"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { createClient } from "@/lib/supabase/client";
import { getFullNameInitial } from "@/utils/profile";
import { JwtPayload } from "@supabase/supabase-js";
import { Coffee, Gauge, LogOut, Settings } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function AvatarDropdown({ user }: { user: JwtPayload }) {
  const router = useRouter();

  const logout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/auth/login");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Avatar>
            <AvatarImage
              src={user.user_metadata?.avatar_url}
              alt={user.email}
            />
            <AvatarFallback>
              {getFullNameInitial(user.user_metadata?.full_name)}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-32">
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link
              href={
                user.user_metadata?.role === "admin"
                  ? "/admin/dashboard"
                  : "/dashboard"
              }
              className="flex items-center gap-2"
            >
              <Gauge /> Dashboard
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href={"/orders"} className="flex items-center gap-2">
              <Coffee /> My Orders
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href={"/profile"} className="flex items-center gap-2">
              <Settings /> Preferences
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            className="text-destructive font-semibold"
            onClick={logout}
          >
            <LogOut />
            Log out
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
