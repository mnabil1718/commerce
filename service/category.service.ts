"use server";

import { createClient } from "@/lib/supabase/server";
import { ActionResult } from "@/types/action.type";
import { AddCategoryFormSchemaType, Category } from "@/types/category.type";


export async function getProductCategories(): Promise<ActionResult<Category[]>> {
    const supabase = await createClient();
    const { data, error } = await supabase.from("categories").select();

    if (error) throw error;

    return { data };
}


export async function createCategory(req: AddCategoryFormSchemaType): Promise<ActionResult<Category | null>> {
    const supabase = await createClient();
    const { data, error } = await supabase.from("categories").insert({
        title: req.title,
        slug: req.slug,
        image: req.image ?? null,
    }).select().single();

    if (error) throw error;

    return { data };
}