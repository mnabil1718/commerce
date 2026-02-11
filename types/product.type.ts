import { Database, Tables } from "@/database.types";
import { AddProductFormSchema } from "@/schema/product.schema";
import z from "zod";
import { CategoryRow } from "./category.type";

export type Product = Tables<"products">;

export type ProductRow = Database["public"]["Tables"]["products"]["Row"];

export type ProductWithCategory = ProductRow & {
  category: CategoryRow | null;
};

export type AddProductFormSchemaType = z.infer<typeof AddProductFormSchema>;
export type AddProductFormSchemaInputType = z.input<typeof AddProductFormSchema>;