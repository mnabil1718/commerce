"use server";

import { createClient } from "@/lib/supabase/server";
import { CartItem } from "@/stores/cart-store";

export async function saveCart(userId: string, items: CartItem[]): Promise<void> {
    const supabase = await createClient();

    const { error } = await supabase.from("carts").upsert({
        user_id: userId,
        items,
        updated_at: new Date().toISOString(),
    }, {
      onConflict: "user_id",
    });

    if (error) throw error;
}


export async function loadCart(userId: string): Promise<CartItem[]> {
    const supabase = await createClient();

    const { data, error } = await supabase.from("carts").select().eq("user_id", userId).maybeSingle();  

    if (error) throw error;

    return data?.items as CartItem[] || []
}