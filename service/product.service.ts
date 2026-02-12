"use server"

import { createClient } from "@/lib/supabase/server";
import { ActionResult } from "@/types/action.type";
import { AddProductFormSchemaType, Product, ProductWithCategory } from "@/types/product.type";

export async function createProduct(req: AddProductFormSchemaType): Promise<void> {
    const supabase = await createClient();
    const { error } = await supabase.from("products").insert({
        title: req.title,
        description: req.description,
        category_id: Number(req.category_id),
        stock: req.stock,
        price: req.price,
        slug: req.slug,
        image: req.image ?? null,
    });

    if (error) throw error;
}

export async function updateProduct(id: number, req: AddProductFormSchemaType): Promise<void> {
    const supabase = await createClient();
    const { error } = await supabase.from("products").update({
        title: req.title,
        description: req.description,
        category_id: Number(req.category_id),
        stock: req.stock,
        price: req.price,
        slug: req.slug,
        image: req.image ?? null,
    }).eq("id", id);

    if (error) throw error;
}

export async function getProducts(): Promise<
  ActionResult<ProductWithCategory[]>
> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("products")
    .select(`
      *,
      category:categories (*)
    `)
    .order("created_at", { ascending: false })
    .overrideTypes<ProductWithCategory[], { merge: false }>();

  if (error) throw error;

  return { data };
}

export async function getProductsWithoutRelation(): Promise<ActionResult<Product[]>> {

  const supabase = await createClient();

  const { data, error } = await supabase
    .from("products")
    .select()
    .order("created_at", { ascending: false });

  if (error) throw error;

  return { data };

}

export async function getProductById(id: number): Promise<ActionResult<Product>> {
    const supabase = await createClient();
    const { data, error } = await supabase.from("products").select().eq("id", id).single();

    if (error) throw error;

    return { data };
}


export async function getSingleLatestProduct(): Promise<ActionResult<Product>> {
    const supabase = await createClient();
    const { data, error } = await supabase.from("products").select().order("created_at", { ascending: false }).limit(1).single();

    if (error) throw error;

    return { data };
}

export async function deleteProductById(id: number): Promise<void> {
    const supabase = await createClient();
    const { error } = await supabase.from("products").delete().eq("id", id);

    if (error) throw error;
}

