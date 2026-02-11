"use client";

import { PackagePlus } from "lucide-react";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";
import { useRouter } from "next/navigation";

export function SidebarAddProduct() {
  const router = useRouter();
  const add = () => {
    router.push("/admin/products/add");
  };
  return (
    <SidebarGroup>
      <SidebarMenu>
        <SidebarMenuItem className="flex items-center gap-2">
          <SidebarMenuButton
            onClick={add}
            tooltip="Add Product"
            className="bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground min-w-8 duration-200 ease-linear"
          >
            <PackagePlus />
            <span>Add Product</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  );
}
