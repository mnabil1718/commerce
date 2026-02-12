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
            variant={"outline"}
            onClick={add}
            tooltip="Add Product"
          >
            <PackagePlus />
            <span>Add Product</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  );
}
