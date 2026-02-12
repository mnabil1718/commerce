"use server";

import { createClient } from "@/lib/supabase/server";
import { generateUniqueFileName } from "@/utils/storage";


// used in the server as part of insert or update logic, no ActionResult required
export async function upload(bucket: string, path: string, file: File): Promise<{ id: string, path: string, fullPath: string } | null> {
    const supabase = await createClient();

    const fileName = generateUniqueFileName(file);

    const { data, error } = await supabase.storage.from(bucket).upload(`${path}/${fileName}`, file);

    if (error) throw error;

    return data;
}