"use client";

import { useShippingAddressStore } from "@/providers/shipping-address.provider";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { SelectedShippingAddress } from "./selected-shipping-address";
import { ShippingAddressForm } from "./shipping-address-form";

export function ShippingAddressManager() {
  const addresses = useShippingAddressStore((state) => state.addresses);

  const show = (): React.ReactNode => {
    if (addresses.length === 0) {
      return <ShippingAddressForm />;
    }

    return <SelectedShippingAddress />;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Shipping Address</CardTitle>
      </CardHeader>
      <CardContent>{show()}</CardContent>
    </Card>
  );
}
