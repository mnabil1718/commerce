import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { ShippingAddress } from "@/types/shipping-address.type";
import { EditShippingAddressForm } from "./edit-shipping-address-form";

export type EditShippingAddressDialogProps = {
  children: React.ReactNode;
  initData: ShippingAddress;
  afterSubmit?: () => void;
};

export function EditShippingAddressDialog({
  children,
  initData,
  afterSubmit,
}: EditShippingAddressDialogProps) {
  const [open, setOpen] = useState<boolean>(false);

  const submitted = () => {
    setOpen(false);

    if (afterSubmit) afterSubmit();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Shipping Address</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="no-scrollbar max-h-[80vh] overflow-y-auto p-1">
          <EditShippingAddressForm
            initialData={initData}
            submitted={submitted}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
