import { Tables } from "@/database.types";
import { ShippingAddressFormSchema } from "@/schema/shipping-address.schema";
import z from "zod";

export type ShippingAddress = Tables<"shipping_addresses">;

export type ShippingAddressFormSchemaType = z.infer<typeof ShippingAddressFormSchema>;