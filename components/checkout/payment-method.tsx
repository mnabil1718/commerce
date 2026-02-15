"use client";

import useStore from "@/hooks/use-store";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Field, FieldContent, FieldLabel, FieldTitle } from "../ui/field";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { useCartStore } from "@/providers/cart.provider";
import { displayRupiah } from "@/utils/price";
import { useShippingAddressStore } from "@/providers/shipping-address.provider";
import { useState } from "react";
import { createOrder, initPayment } from "@/service/order.service";
import { Loader2 } from "lucide-react";

export function PaymentMethod() {
  const store = useStore(useCartStore, (state) => state);
  const [loading, setLoading] = useState<boolean>(false);
  const { addresses, getPrimary, selectedAddress } = useShippingAddressStore(
    (state) => state,
  );

  if (!store) return null;

  const selected = selectedAddress || getPrimary() || addresses[0];

  const isDisabled =
    store.items.length === 0 || addresses.length === 0 || loading;

  const pay = async () => {
    setLoading(true);

    try {
      const { token } = await initPayment(store.items, selected);

      // Trigger Snap Popup
      window.snap.pay(token, {
        onSuccess: (result) => {
          console.log("success");
        },
        onPending: (result) => {
          console.log("pending");
        },
        onError: (result) => {
          console.log("error");
        },
        onClose: () => {
          console.log("customer closed the popup");
        },
      });
    } catch (e: unknown) {
      alert("Failed to start payment");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment Method</CardTitle>
      </CardHeader>
      <CardContent>
        <RadioGroup defaultValue="midtrans">
          <FieldLabel htmlFor="midtrans">
            <Field orientation="horizontal">
              <FieldContent>
                <FieldTitle className="line-clamp-1">
                  Midtrans Payment Gateway
                </FieldTitle>
              </FieldContent>
              <RadioGroupItem value="midtrans" id="midtrans" />
            </Field>
          </FieldLabel>
        </RadioGroup>
      </CardContent>
      <CardFooter className="flex flex-col items-stretch gap-2 border-t">
        {store.items.length > 0 && (
          <div className="flex items-center justify-between font-semibold">
            <span>Total</span>
            <span>{displayRupiah(store.getTotalPrice())}</span>
          </div>
        )}
        <Button
          disabled={isDisabled}
          onClick={pay}
          className="font-medium rounded-full"
        >
          {loading ? (
            <div className="flex items-center gap-1">
              <Loader2 className="animate-spin" /> Processing...
            </div>
          ) : (
            "Pay Now"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
