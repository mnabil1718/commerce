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

export async function getProductsWithoutRelation({
  min,
  max,
  category,
  sort,
  q,
}: {
  min?: number;
  max?: number;
  category?: number;
  sort?: string;
  q?: string;
}): Promise<ActionResult<Product[]>> {
  const supabase = await createClient();

  let query = supabase.from("products").select("*");

  if (min !== undefined) {
    query = query.gte("price", min);
  }

  if (max !== undefined) {
    query = query.lte("price", max);
  }

  if (category) {
    query = query.eq("category_id", category);
  }

  if (q) {
    query = query.ilike("title", `%${q}%`);
  }

  switch (sort) {
    case "a-z":
      query = query.order("title", { ascending: true });
      break;
    case "oldest":
      query = query.order("created_at", { ascending: true });
      break;
    case "newest":
    default:
      query = query.order("created_at", { ascending: false });
      break;
  }

  const { data, error } = await query;

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

export async function getProductPriceRange(): Promise<{ min: number, max: number }> {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from("products")
    .select("price")
    .order("price", { ascending: true });

  if (error || !data || data.length === 0) {
    return { min: 0, max: 1000000 }; // Fallback
  }

  return {
    min: data[0].price,
    max: data[data.length - 1].price,
  };
}

