"use client";

import { Check, Edit, EllipsisVertical, Plus, Trash } from "lucide-react";
import { Button } from "../ui/button";
import { AddShippingAddressDialog } from "./shipping-address-dialog";
import { useShippingAddressStore } from "@/providers/shipping-address.provider";

import { Badge } from "../ui/badge";
import { constructFullAddress } from "@/utils/address";
import { EmptyAddress } from "../empty-address";
import { Card, CardContent } from "../ui/card";
import { cn } from "@/lib/utils";
import { ShippingAddress } from "@/types/shipping-address.type";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EditShippingAddressDialog } from "./edit-shipping-address-dialog";
import { useState } from "react";
import { DeleteDialog } from "../delete-dialog";

export function MyShippingAddressList() {
  const addresses = useShippingAddressStore((state) => state.addresses);

  return (
    <>
      <div className="flex justify-end">
        <AddShippingAddressDialog>
          <Button variant={"outline"}>
            <Plus /> Add New Address
          </Button>
        </AddShippingAddressDialog>
      </div>

      {addresses.length === 0 && (
        <div className="flex flex-col gap-5 min-h-72 w-full justify-center items-center">
          <EmptyAddress />
          <span className="text-center text-sm text-muted-foreground">
            You have no saved addresses
          </span>
        </div>
      )}
      {addresses.length > 0 && (
        <div className="w-full flex flex-col gap-5">
          {addresses.map((a) => {
            return (
              <Card
                key={a.id}
                className={cn(a.is_primary && "outline-1 bg-muted/10")}
              >
                <CardContent>
                  <div className="w-full flex justify-between">
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <span className="font-medium truncate">{a.label}</span>
                      {a.is_primary && (
                        <Badge variant={"outline"}>Primary</Badge>
                      )}
                    </div>
                    <MyShippingAddressDropdown address={a} />
                  </div>
                  <h2 className="font-medium text-lg">{a.full_name}</h2>
                  <span className="text-muted-foreground/80">{a.phone}</span>
                  <p className="text-muted-foreground line-clamp-2">
                    {constructFullAddress(a)}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </>
  );
}

export function MyShippingAddressDropdown({
  address,
}: {
  address: ShippingAddress;
}) {
  const { update, delete: deleteAddr } = useShippingAddressStore(
    (state) => state,
  );
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const setPrimary = () => {
    update(address.id, {
      ...address,
      is_primary: true,
      address_line2: address.address_line2 || undefined,
    });
  };

  const deleteFn = () => {
    deleteAddr(address.id);
    setMenuOpen(false);
  };
  return (
    <DropdownMenu open={menuOpen} onOpenChange={setMenuOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">
          <EllipsisVertical />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuItem disabled={address.is_primary} onClick={setPrimary}>
            <Check /> Set as Primary
          </DropdownMenuItem>
          <EditShippingAddressDialog
            afterSubmit={() => setMenuOpen(false)}
            initData={address}
          >
            <DropdownMenuItem
              onSelect={(e) => {
                e.preventDefault();
              }}
            >
              <div className="w-full flex gap-2 items-center">
                <Edit /> Edit
              </div>
            </DropdownMenuItem>
          </EditShippingAddressDialog>
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
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
