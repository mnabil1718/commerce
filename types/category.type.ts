import { Database, Tables } from "@/database.types";
import { AddCategoryFormSchema } from "@/schema/category.schema";
import z from "zod";

export type Category = Tables<"categories">;

export type CategoryRow = Database["public"]["Tables"]["categories"]["Row"];

export type AddCategoryFormSchemaType = z.infer<typeof AddCategoryFormSchema>;