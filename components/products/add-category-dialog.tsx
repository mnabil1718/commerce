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
import { SlugInput } from "./slug-input";
import { createCategory } from "@/service/category.service";
import { TooltipWrapper } from "../tooltip-wrapper";
import { Ellipsis, Plus } from "lucide-react";
import { useState } from "react";
import { FileUpload } from "../file-upload";

export type AddCategoryDialogProps = {
  onCreatedCallback: (c: Category) => void;
};

export function AddCategoryDialog({
  onCreatedCallback,
}: AddCategoryDialogProps) {
  const [open, setOpen] = useState<boolean>(false);
  const form = useForm<AddCategoryFormSchemaType>({
    resolver: zodResolver(AddCategoryFormSchema),
    mode: "onSubmit",
    defaultValues: {
      title: "",
      slug: "",
      image: undefined,
    },
  });

  const submit = async (req: AddCategoryFormSchemaType) => {
    const { data } = await createCategory(req);

    if (data) {
      onCreatedCallback(data);
      form.reset();
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <FormProvider {...form}>
        <TooltipWrapper content="Add new category">
          <Button
            type="button"
            variant={"outline"}
            onClick={() => setOpen(true)}
            className="flex-none w-fit text-muted-foreground"
          >
            <Plus />
          </Button>
        </TooltipWrapper>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add Category</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re
              done.
            </DialogDescription>
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
              <FileUpload<AddCategoryFormSchemaType> />
            </Field>
          </FieldGroup>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button
              type="button"
              className="min-w-20"
              disabled={!form.formState.isValid || form.formState.isSubmitting}
              onClick={form.handleSubmit(submit)}
            >
              {form.formState.isSubmitting ? (
                <Ellipsis className="animate-pulse" />
              ) : (
                "Create"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </FormProvider>
    </Dialog>
  );
}
