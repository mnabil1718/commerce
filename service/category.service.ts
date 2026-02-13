"use server";

import { createClient } from "@/lib/supabase/server";
import { ActionResult } from "@/types/action.type";
import { AddCategoryFormSchemaType, Category } from "@/types/category.type";
import { upload } from "./storage.service";
import { BUCKET_NAME, IMAGES_PATH } from "@/constants/storage";
import { getPublicUrl } from "@/utils/storage";


export async function getProductCategories(): Promise<ActionResult<Category[]>> {
    const supabase = await createClient();
    const { data, error } = await supabase.from("categories").select().order("created_at", { ascending: false });

    if (error) throw error;

    return { data };
}


export async function createCategory(req: AddCategoryFormSchemaType): Promise<ActionResult<Category | null>> {
    const supabase = await createClient();
        let url: string | null = null;
    
        if (req.image) {
          const fileInfo = await upload(BUCKET_NAME, IMAGES_PATH, req.image);
          url = fileInfo ? getPublicUrl(fileInfo.fullPath) : null;
        }

    const { data, error } = await supabase.from("categories").insert({
        title: req.title,
        slug: req.slug,
        image: url,
    }).select().single();

    if (error) throw error;

    return { data };
}


export async function updateCategory(id: number, imageurl: string | null, req: AddCategoryFormSchemaType): Promise<void> {
    const supabase = await createClient();
    
    if (req.image) {
        const fileInfo = await upload(BUCKET_NAME, IMAGES_PATH, req.image);
        imageurl = fileInfo ? getPublicUrl(fileInfo.fullPath) : null;
    }

    const { error } = await supabase.from("categories").update({
        title: req.title,
        slug: req.slug,
        image: imageurl,
    }).eq("id", id);

    if (error) throw error;
}

export async function deleteCategoryById(id: number): Promise<void> {
    const supabase = await createClient();
    const { error } = await supabase.from("categories").delete().eq("id", id);


    if (error) throw error;
}