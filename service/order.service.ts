"use server";

import { snap } from "@/lib/midtrans";
import { createClient } from "@/lib/supabase/server";
import { createServiceRoleClient } from "@/lib/supabase/service-role";
import { CartItem } from "@/stores/cart-store";
import { ActionResult } from "@/types/action.type";
import { CreateOrderItem, Order, OrderWithRelation } from "@/types/order.type";
import { ShippingAddress } from "@/types/shipping-address.type";

export async function createOrder(items: CartItem[], addr: ShippingAddress): Promise<ActionResult<{ 
    order: Order; 
    items: CartItem[]; 
    addr: ShippingAddress; 
}>> {

    const supabase = await createClient();

    // user handling
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) throw error;
    if (!user) throw new Error("Action not allowed");


    // order item handling & verification
    const productIds = items.map(i => i.product_id);
    const { data: pData, error: pError } = await supabase.from("products").select().in("id", productIds);

    if (pError) throw pError;
    if (!pData) throw new Error("Cannot verify products");


    const order_items: CreateOrderItem[] = [];
    for (const p of pData) {
        const pCart = items.find(i => i.product_id === p.id);
        if (!pCart) throw new Error("product not found");
        if (pCart.qty > p.stock) throw new Error("insufficient stock");
        order_items.push({ image: p.image, price: p.price, product_id: p.id, quantity: pCart.qty, title: p.title  });
    }

    const total = order_items.reduce((agg, curr) => {
        return agg + (curr.price * curr.quantity);
    }, 0);

    const safeTotal = Math.round(total * 100) / 100; // fixed 2 decimal point


    // order creation
    const { data: order, error: oError } = await supabase.from("orders").insert({
        user_id: user.id,
        status: "unfulfilled",
        payment_status: "waiting payment",
        total_amount: safeTotal,
    }).select().single();
    if (oError) throw oError;
    if (!order) throw new Error("no order returned");

    // order items creation
    const { error: oiError } = await supabase
        .from("order_items")
        .insert(
            order_items.map((o) => ({
                order_id: order.id,
                product_id: o.product_id,
                image: o.image,
                title: o.title,
                quantity: o.quantity,
                price: o.price,
            }))
        );

    if (oiError) throw oiError;

    // address verification
    const { data: address, error: aError } = await supabase.from("shipping_addresses").select().eq("id", addr.id).single();
    if (aError) throw aError;
    if (!address) throw new Error("address not found");

    // order address creation
    const { error: oaError } = await supabase.from("order_addresses").insert({
        order_id: order.id,
        address_line1: address.address_line1,
        address_line2: address.address_line2 || "",
        label: address.label,
        city: address.city,
        country: address.country,
        postal_code: address.postal_code,
        phone: address.phone,
        state: address.state,
        full_name: address.full_name,
    });

    if (oaError) throw oaError;

    return { data: { order, items, addr } };
}

export async function updateOrder(order: Order): Promise<ActionResult<Order>> {
    const supabase = await createClient();

    const { data, error: oError } = await supabase
        .from("orders")
        .update({
            total_amount: order.total_amount,
            snap_token: order.snap_token,
            status: order.status, 
        })
        .select()
        .eq("id", order.id)
        .maybeSingle();

    if (oError) throw oError;
    if (!data) throw new Error("Order not found");

    return { data };
}

export async function getOrderByIdAsServiceRole(id: string): Promise<ActionResult<Order>> {
    const supabase = await createServiceRoleClient();
    const { data, error } = await supabase
        .from("orders")
        .select()
        .eq("id", id)
        .maybeSingle();

    if (error) throw error;
    if (!data) throw new Error("Order not found");

    return { data };
}

export async function updateOrderAsServiceRole(order: Order): Promise<ActionResult<Order>> {
    const supabase = await createServiceRoleClient();

    const { data, error: oError } = await supabase
        .from("orders")
        .update({
            payment_method: order.payment_method,
            total_amount: order.total_amount,
            snap_token: order.snap_token,
            payment_status: order.payment_status,
            status: order.status, 
        })
        .select()
        .eq("id", order.id)
        .maybeSingle();

    if (oError) throw oError;
    if (!data) throw new Error("Order not found");

    return { data };
}

export async function initPayment(items: CartItem[], addr: ShippingAddress): Promise<{ token: string, order: Order }> {
    const { data: { order } } = await createOrder(items, addr);

    const parameter = {
        transaction_details: {
            order_id: order.id,
            gross_amount: order.total_amount,
        },
    };

    try {
        const transaction = await snap.createTransaction(parameter);

        await updateOrder({ ...order, snap_token: transaction.token })

        return { token: transaction.token, order };

    } catch (error: unknown) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }

        throw new Error("Cannot proccess transaction");
    }
}

export async function getOrderByIdWithRelations(id: string): Promise<ActionResult<OrderWithRelation>> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("orders")
    .select(`
      *,
      order_items (*),
      order_addresses (*)
    `)
    .eq("id", id)
    .maybeSingle();

  if (error) throw error;

  if (!data) throw new Error("Order not found");


  return { data };
}

export async function getOrderByIdWithRelationsAsServiceRole(id: string): Promise<ActionResult<OrderWithRelation>> {
  const supabase = await createServiceRoleClient();

  const { data, error } = await supabase
    .from("orders")
    .select(`
      *,
      order_items (*),
      order_addresses (*)
    `)
    .eq("id", id)
    .maybeSingle();

  if (error) throw error;

  if (!data) throw new Error("Order not found");


  return { data };
}

export async function getOrdersWithRelation(): Promise<ActionResult<OrderWithRelation[]>> {
    const supabase = await createClient();

    const { data, error } = await supabase.from("orders").select(`
      *,
      order_items (*),
      order_addresses (*)
    `).order("created_at", { ascending: false });

    if (error) throw error;

    return { data: data || [] }
}