"use client";

import { Controller, FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { AddProductFormSchema } from "@/schema/product.schema";
import { Field, FieldError, FieldLabel } from "../ui/field";
import { Required } from "../form/required";
import { Input } from "../ui/input";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "../ui/input-group";
import { MAX_PRODUCT_DESCRIPTION_LENGTH } from "@/constants/product";

import { FormUpload } from "../form-upload";
import { SlugInput } from "./slug-input";
import { CategorySelector } from "./category-selector";
import { AddProductFormSchemaType, Product } from "@/types/product.type";
import { Button } from "../ui/button";
import Link from "next/link";
import { updateProduct } from "@/service/product.service";
import { Ellipsis } from "lucide-react";
import { useRouter } from "next/navigation";

export type AdminAddProductFormProps = {
  initialData: Product;
};

function getInitialData(product: Product) {
  return {
    title: product.title,
    slug: product.slug,
    category_id: product.category_id.toString(),
    image: product.image || undefined,
    stock: product.stock,
    price: product.price,
    description: product.description,
  };
}

export function AdminEditProductForm({
  initialData,
}: AdminAddProductFormProps) {
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(AddProductFormSchema),
    mode: "onSubmit",
    defaultValues: getInitialData(initialData),
  });

  const edit = async (req: AddProductFormSchemaType) => {
    await updateProduct(initialData.id, req);
    router.push("/admin/products");
  };

  return (
    <FormProvider {...form}>
      <form
        id="add-product-form"
        onSubmit={form.handleSubmit(edit)}
        className="col-span-2 grid grid-cols-1 gap-5 w-full"
      >
        <Card className="">
          <CardHeader>
            <CardTitle>General Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="w-full grid grid-cols-2 gap-5">
              <Controller
                name="title"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field
                    data-invalid={fieldState.invalid}
                    className="col-span-2 md:col-span-1"
                  >
                    <FieldLabel htmlFor="title" className="gap-1">
                      Product Title
                      <Required />
                    </FieldLabel>
                    <Input
                      {...field}
                      id="title"
                      aria-invalid={fieldState.invalid}
                      placeholder="Matcha Latte Coffee Original"
                      autoComplete="off"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <SlugInput<AddProductFormSchemaType> />
              <CategorySelector />
              <Controller
                name="description"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field
                    data-invalid={fieldState.invalid}
                    className="col-span-2"
                  >
                    <FieldLabel htmlFor="description">Description</FieldLabel>
                    <InputGroup>
                      <InputGroupTextarea
                        {...field}
                        id="description"
                        placeholder="Tasty latte made with real coffee"
                        className="min-h-32"
                        aria-invalid={fieldState.invalid}
                      />
                      <InputGroupAddon align="block-end">
                        <InputGroupText className="tabular-nums">
                          {field.value.length}/{MAX_PRODUCT_DESCRIPTION_LENGTH}{" "}
                          characters
                        </InputGroupText>
                      </InputGroupAddon>
                    </InputGroup>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="">
          <CardHeader>
            <CardTitle>Pricing & Stock</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="w-full grid grid-cols-2 gap-5">
              <Controller
                name="price"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field
                    data-invalid={fieldState.invalid}
                    className="col-span-2 md:col-span-1"
                  >
                    <FieldLabel htmlFor="price" className="gap-1">
                      Product Price
                      <Required />
                    </FieldLabel>
                    <InputGroup>
                      <InputGroupAddon>
                        <InputGroupText>Rp</InputGroupText>
                      </InputGroupAddon>
                      <InputGroupInput
                        type="number"
                        {...field}
                        placeholder="0.00"
                      />
                    </InputGroup>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="stock"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field
                    data-invalid={fieldState.invalid}
                    className="col-span-2 md:col-span-1"
                  >
                    <FieldLabel htmlFor="stock" className="gap-1">
                      Stock Quantity
                      <Required />
                    </FieldLabel>
                    <Input type="number" {...field} placeholder="1" />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>
          </CardContent>
        </Card>

        <Card className=" flex flex-col">
          <CardHeader>
            <CardTitle>Upload Image</CardTitle>
          </CardHeader>
          <CardContent className="flex-1">
            <FormUpload<AddProductFormSchemaType>
              bucketName="uploads"
              path="images"
            />
          </CardContent>
        </Card>
        <div className="flex w-full justify-end gap-5">
          <Link href={`/admin/products`}>
            <Button variant={"ghost"} type="button">
              Cancel
            </Button>
          </Link>

          <Button
            type="submit"
            disabled={form.formState.isSubmitting}
            className="min-w-20"
          >
            {form.formState.isSubmitting ? (
              <Ellipsis className="animate-pulse" />
            ) : (
              "Save Changes"
            )}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
