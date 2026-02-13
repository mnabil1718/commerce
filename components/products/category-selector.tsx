"use client";

import { Controller, useFormContext } from "react-hook-form";
import { Field, FieldContent, FieldError, FieldLabel } from "../ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useEffect, useState } from "react";
import { Category } from "@/types/category.type";
import { getProductCategories } from "@/service/category.service";
import { AddCategoryDialog } from "../categories/add-category-dialog";
import { AddProductFormSchemaType } from "@/types/product.type";
import { Required } from "../form/required";
import { Plus } from "lucide-react";

export function CategorySelector() {
  const form = useFormContext<AddProductFormSchemaType>();
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const { data } = await getProductCategories();
      setCategories(data);
    };

    fetchCategories();
  }, []);

  const added = (c: Category) => {
    setCategories((prev) => [...prev, c]);

    form.setValue("category_id", c.id.toString(), {
      shouldDirty: true,
      shouldValidate: true,
    });

    form.trigger("category_id");
  };

  return (
    <div className="col-span-2 relative flex items-end gap-2">
      <Controller
        name="category_id"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field
            className="w-full flex-1"
            orientation="responsive"
            data-invalid={fieldState.invalid}
          >
            <FieldContent>
              <FieldLabel htmlFor="category_id">
                Category <Required />
              </FieldLabel>

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </FieldContent>
            <Select
              value={field.value}
              onValueChange={field.onChange}
              key={categories.length}
            >
              <SelectTrigger
                id="category_id"
                aria-invalid={fieldState.invalid}
                className="min-w-30"
              >
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent position="item-aligned">
                {categories.map((c) => {
                  return (
                    <SelectItem key={c.id} value={c.id.toString()}>
                      {c.title}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </Field>
        )}
      />

      <AddCategoryDialog onCreatedCallback={added}>
        <Plus />
      </AddCategoryDialog>
    </div>
  );
}
