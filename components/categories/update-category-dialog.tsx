import { Controller, FormProvider, useForm } from "react-hook-form";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "../ui/field";
import { Input } from "../ui/input";
import { AddCategoryFormSchemaType, Category } from "@/types/category.type";
import { AddCategoryFormSchema } from "@/schema/category.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Required } from "../form/required";
import { SlugInput } from "../products/slug-input";
import { updateCategory } from "@/service/category.service";
import { Ellipsis } from "lucide-react";
import { useState } from "react";
import { FileUpload } from "../file-upload";

export type UpdateCategoryDialogProps = {
  initialData: Category;
  children: React.ReactNode;
  onUpdatedCallback?: () => void;
};

export function UpdateCategoryDialog({
  initialData,
  children,
  onUpdatedCallback,
}: UpdateCategoryDialogProps) {
  const [open, setOpen] = useState<boolean>(false);
  const form = useForm<AddCategoryFormSchemaType>({
    resolver: zodResolver(AddCategoryFormSchema),
    mode: "onSubmit",
    defaultValues: {
      title: initialData.title,
      slug: initialData.slug,
      image: null,
    },
  });

  const submit = async (req: AddCategoryFormSchemaType) => {
    await updateCategory(initialData.id, initialData.image, req);

    form.reset();
    setOpen(false);

    if (onUpdatedCallback) onUpdatedCallback();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <FormProvider {...form}>
        <Button
          type="button"
          variant={"outline"}
          onClick={() => setOpen(true)}
          className="flex-none w-fit text-muted-foreground"
        >
          {children}
        </Button>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Update Category</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <Controller
              name="title"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field
                  data-invalid={fieldState.invalid}
                  className="col-span-2 md:col-span-1"
                >
                  <FieldLabel htmlFor="title" className="gap-1">
                    Category Title
                    <Required />
                  </FieldLabel>
                  <Input
                    {...field}
                    id="title"
                    aria-invalid={fieldState.invalid}
                    placeholder="Original Matcha"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <SlugInput<AddCategoryFormSchemaType> />
            <Field>
              <FieldLabel>Thumbnail</FieldLabel>
              <FieldDescription>
                For best results, upload image with square aspect ratio 1:1
              </FieldDescription>
              <FileUpload<AddCategoryFormSchemaType>
                initialFileUrl={initialData.image || undefined}
              />
            </Field>
          </FieldGroup>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button
              type="button"
              className="min-w-20"
              disabled={form.formState.isSubmitting}
              onClick={form.handleSubmit(submit)}
            >
              {form.formState.isSubmitting ? (
                <Ellipsis className="animate-pulse" />
              ) : (
                "Save Changes"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </FormProvider>
    </Dialog>
  );
}
