import z from "zod";

export const AddCategoryFormSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(75, "Title is too long"),
    
  slug: z
    .string()
    .min(3, "Slug must be at least 3 characters")
    .lowercase()
    .trim()
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Slug must be URL-safe (lowercase, numbers, and hyphens only)"
    ),

  image: z.url("Invalid image URL").optional(),
});