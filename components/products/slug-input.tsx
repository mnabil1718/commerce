"use client";

import { cn } from "@/lib/utils";
import { Controller, useFormContext, Path, PathValue } from "react-hook-form";
import { TooltipWrapper } from "../tooltip-wrapper";
import { Button } from "../ui/button";
import { RefreshCcw } from "lucide-react";
import { Input } from "../ui/input";
import { Field, FieldError, FieldLabel } from "../ui/field";
import { Required } from "../form/required";
import { MouseEvent } from "react";
import { slugify } from "@/utils/slug";

export type SlugFormRequirements = {
  title: string;
  slug: string;
};

export function SlugInput<T extends SlugFormRequirements>() {
  const form = useFormContext<T>();

  const SLUG_FIELD = "slug" as Path<T>;
  const TITLE_FIELD = "title" as Path<T>;

  const generateSlugFromTitle = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    form.setFocus(SLUG_FIELD);
    form.setValue(SLUG_FIELD, "" as PathValue<T, Path<T>>);

    const title = form.getValues(TITLE_FIELD);

    if (!title || title.trim() === "") {
      form.setError(
        SLUG_FIELD,
        { type: "manual", message: "Title is empty" },
        { shouldFocus: true },
      );
      return;
    }

    form.clearErrors(SLUG_FIELD);
    form.setValue(SLUG_FIELD, slugify(title) as PathValue<T, Path<T>>, {
      shouldDirty: true,
      shouldValidate: true,
    });
  };

  return (
    <Controller
      name={SLUG_FIELD}
      control={form.control}
      render={({ field, fieldState }) => (
        <Field
          data-invalid={fieldState.invalid}
          className="col-span-2 md:col-span-1"
        >
          <FieldLabel>
            Slug <Required />
          </FieldLabel>
          <div className="relative">
            <TooltipWrapper content="Generate from title">
              <Button
                variant="ghost"
                type="button"
                className="absolute right-0 z-10"
                onClick={generateSlugFromTitle}
              >
                <RefreshCcw size={14} />
              </Button>
            </TooltipWrapper>

            <Input
              type="text"
              placeholder="e.g. matcha-latte-coffee-original"
              {...field}
              value={(field.value as string) ?? ""}
              className={cn(
                "pr-11",
                fieldState.invalid
                  ? "border-destructive focus-visible:ring-destructive"
                  : "border-border",
              )}
            />
          </div>
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}
