"use client";

import { Controller, FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { ShippingAddressFormSchema } from "@/schema/shipping-address.schema";
import { ShippingAddressFormSchemaType } from "@/types/shipping-address.type";
import { Field, FieldError, FieldLabel } from "../ui/field";
import { Required } from "../form/required";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { Ellipsis } from "lucide-react";
import { useShippingAddressStore } from "@/providers/shipping-address.provider";

export function ShippingAddressForm() {
  const { add, getPrimary } = useShippingAddressStore((state) => state);
  const form = useForm<ShippingAddressFormSchemaType>({
    resolver: zodResolver(ShippingAddressFormSchema),
    mode: "onSubmit",
    defaultValues: {
      label: "",
      phone: "",
      address_line1: "",
      address_line2: "",
      city: "",
      state: "",
      postal_code: "",
      country: "",
      is_primary: false,
    },
  });

  const onSubmit = async (data: ShippingAddressFormSchemaType) => {
    const primary = getPrimary();

    if (!primary) {
      add({ ...data, is_primary: true });
      return;
    }

    add(data);
  };

  return (
    <FormProvider {...form}>
      <form
        id="shipping-address-form"
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-2 gap-5 w-full"
      >
        {/* Address Label */}
        <Controller
          name="label"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field
              data-invalid={fieldState.invalid}
              className="col-span-2 md:col-span-1"
            >
              <FieldLabel htmlFor="label" className="gap-1">
                Address Label <Required />
              </FieldLabel>
              <Input {...field} id="label" placeholder="Home / Office" />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {/* Phone */}
        <Controller
          name="phone"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field
              data-invalid={fieldState.invalid}
              className="col-span-2 md:col-span-1"
            >
              <FieldLabel htmlFor="phone" className="gap-1">
                Phone Number <Required />
              </FieldLabel>
              <Input
                {...field}
                id="phone"
                type="tel"
                placeholder="08xxxxxxxxxx"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {/* Street Address */}
        <Controller
          name="address_line1"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="col-span-2">
              <FieldLabel htmlFor="address_line1" className="gap-1">
                Street Address <Required />
              </FieldLabel>
              <Input
                {...field}
                id="address_line1"
                placeholder="123 Coffee St."
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {/* Address Line 2 */}
        <Controller
          name="address_line2"
          control={form.control}
          render={({ field }) => (
            <Field className="col-span-2">
              <FieldLabel htmlFor="address_line2">
                Apartment, Suite, etc. (Optional)
              </FieldLabel>
              <Input {...field} id="address_line2" placeholder="Apt 4B" />
            </Field>
          )}
        />

        {/* City */}
        <Controller
          name="city"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field
              data-invalid={fieldState.invalid}
              className="col-span-2 md:col-span-1"
            >
              <FieldLabel htmlFor="city" className="gap-1">
                City <Required />
              </FieldLabel>
              <Input {...field} id="city" placeholder="South Jakarta" />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {/* State */}
        <Controller
          name="state"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field
              data-invalid={fieldState.invalid}
              className="col-span-2 md:col-span-1"
            >
              <FieldLabel htmlFor="state" className="gap-1">
                State / Province <Required />
              </FieldLabel>
              <Input {...field} id="state" placeholder="Greater Jakarta" />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {/* Postal Code */}
        <Controller
          name="postal_code"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field
              data-invalid={fieldState.invalid}
              className="col-span-2 md:col-span-1"
            >
              <FieldLabel htmlFor="postal_code" className="gap-1">
                Postal Code <Required />
              </FieldLabel>
              <Input {...field} id="postal_code" placeholder="16544" />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {/* Country */}
        <Controller
          name="country"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field
              data-invalid={fieldState.invalid}
              className="col-span-2 md:col-span-1"
            >
              <FieldLabel htmlFor="country" className="gap-1">
                Country <Required />
              </FieldLabel>
              <Input {...field} id="country" placeholder="Indonesia" />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {/* Is Primary Checkbox */}
        <Controller
          name="is_primary"
          control={form.control}
          render={({ field }) => (
            <div className="col-span-2 flex items-center gap-2 py-2">
              <Checkbox
                id="is_primary"
                checked={field.value}
                onCheckedChange={field.onChange}
              />
              <FieldLabel
                htmlFor="is_primary"
                className="text-sm font-normal cursor-pointer"
              >
                Set as primary shipping address
              </FieldLabel>
            </div>
          )}
        />

        <div className="col-span-2 flex w-full justify-end pt-2">
          <Button
            type="submit"
            className="min-w-32 rounded-full"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? (
              <Ellipsis className="animate-pulse" />
            ) : (
              "Save Address"
            )}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
