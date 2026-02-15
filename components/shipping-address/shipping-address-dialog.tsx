import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { ShippingAddressForm } from "./shipping-address-form";

export type AddShippingAddressDialogProps = {
  children: React.ReactNode;
};

export function AddShippingAddressDialog({
  children,
}: AddShippingAddressDialogProps) {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Shipping Address</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <ShippingAddressForm submitted={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
