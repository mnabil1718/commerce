"use server"

import { createClient } from "@/lib/supabase/server"
import { ActionResult } from "@/types/action.type";
import { ShippingAddress, ShippingAddressFormSchemaType } from "@/types/shipping-address.type";

export async function getShippingAddresses(): Promise<ActionResult<ShippingAddress[]>> {
    const supabase = await createClient();

    const {data, error} = await supabase.from("shipping_addresses").select();

    if (error) throw error;

    return { data: data || [] };
}

export async function createShippingAddress(addr: ShippingAddressFormSchemaType): Promise<ActionResult<ShippingAddress>>  {
    const supabase = await createClient();

    const { data, error } = await supabase.auth.getUser();

    if (error) throw error;

    if (!data.user) throw new Error("Action not allowed");

    const { data: res, error: addrError } = await supabase.from("shipping_addresses").insert({
        user_id: data.user.id,
        label: addr.label,
        phone: addr.phone,
        address_line1: addr.address_line1,
        address_line2: addr.address_line2 ?? "",
        city: addr.city,
        state: addr.state,
        postal_code: addr.postal_code,
        country: addr.country,
        is_primary: addr.is_primary,
        full_name: addr.full_name,
    }).select().single();

    if (addrError) throw addrError;

    return { data: res };
}

export async function updateShippingAddress(id: string, addr: ShippingAddressFormSchemaType): Promise<ActionResult<ShippingAddress>>  {

    const supabase = await createClient();

    const { data: res, error: addrError } = await supabase.from("shipping_addresses").update({
        label: addr.label,
        phone: addr.phone,
        address_line1: addr.address_line1,
        address_line2: addr.address_line2 ?? "",
        city: addr.city,
        state: addr.state,
        postal_code: addr.postal_code,
        country: addr.country,
        is_primary: addr.is_primary,
        full_name: addr.full_name,
    }).eq("id", id).select().single();

    if (addrError) throw addrError;

    return { data: res };
}

export async function deleteShippingAddress(id: string): Promise<void>  {

    const supabase = await createClient();

    const { error: addrError } = await supabase.from("shipping_addresses").delete().eq("id", id);

    if (addrError) throw addrError;
}