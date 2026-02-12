import { MAX_PRODUCT_DESCRIPTION_LENGTH } from "@/constants/product";
import { z } from "zod";



export const AddProductFormSchema = z.object({
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

  category_id: z
    .string("Please select a category")
    .min(1),

  image: z.url("Invalid image URL").optional(),

  stock: z.coerce.number<number>().int().nonnegative("Stock cannot be negative"),

  price: z.coerce.number<number>().nonnegative("Price cannot be negative"),

  description: z
    .string()
    .min(10, "Description is too short")
    .max(MAX_PRODUCT_DESCRIPTION_LENGTH, "Description is too long"),
});
