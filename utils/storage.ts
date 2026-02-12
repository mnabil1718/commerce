import { nanoid } from "nanoid";

// fullPath includes bucket and folder prefixes
export function getPublicUrl(fullPath: string): string {
    return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${fullPath}`;
}

export function generateUniqueFileName(file: File): string {
    const id = nanoid(6); // prevent duplicates
    const base = file.name.split(".")[0];
    const ext = file.name.split(".")[1];
    const filename = `${base}-${id}.${ext}`;

    return filename
}