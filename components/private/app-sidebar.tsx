"use client";

import * as React from "react";

import { NavUser } from "@/components/private/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Brand } from "../brand";
import { SidebarAddProduct } from "./sidebar-add-product";
import { NavMain } from "./nav-main";
import { navData } from "@/mock/sidebar";
import { usePathname } from "next/navigation";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  const navs = navData.map((item) => ({
    ...item,
    isActive: pathname === item.url || pathname.startsWith(`${item.url}/`),
  }));

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenuItem className="flex justify-center">
          <Brand />
        </SidebarMenuItem>
      </SidebarHeader>
      <SidebarContent>
        <SidebarAddProduct />
        <NavMain items={navs} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
