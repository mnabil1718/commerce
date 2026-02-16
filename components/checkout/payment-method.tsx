/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { initPayment } from "@/service/order.service";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAuthStore } from "@/providers/auth.provider";

export function PaymentMethod() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
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
      const { token, order } = await initPayment(store.items, selected);

      // Trigger Snap Popup
      (window as any).snap.pay(token, {
        onSuccess: (result: any) => {
          store.reset(user?.id || undefined);
          router.push(`/orders/${order.id}`);
        },
        onPending: (result: any) => {
          store.reset(user?.id || undefined);
          router.push(`/orders/${order.id}`);
        },
        onError: (result: any) => {
          toast.error(result.error_message);
        },
        onClose: () => {
          store.reset(user?.id || undefined);
          router.push(`/orders/${order.id}`);
        },
      });
    } catch (e: unknown) {
      if (e instanceof Error) {
        toast.error(e.message);
        return;
      }
      toast.error("Cannot process transaction");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="sticky top-28">
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
