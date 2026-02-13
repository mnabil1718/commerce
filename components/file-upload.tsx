/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Controller, Path, useFormContext } from "react-hook-form";
import { Dropzone } from "./dropzone";
import { useEffect, useState } from "react";
import { Field, FieldError, FieldLabel } from "./ui/field";

export type FileUploadProps = {
  initialFileUrl?: string; // unrelated to image field, get from data image url
};

export function FileUpload<T extends { image?: File | null }>({
  initialFileUrl,
}: FileUploadProps) {
  const FIELD_NAME = "image" as Path<T>;
  const form = useFormContext<T>();
  const [url, setUrl] = useState<string | undefined>(initialFileUrl); // use to display preview / not
  const [removed, setRemoved] = useState<boolean>(false);

  const image = form.watch(FIELD_NAME);

  useEffect(() => {
    if (image instanceof File) {
      const objectUrl = URL.createObjectURL(image);
      setUrl(objectUrl);

      return () => URL.revokeObjectURL(objectUrl);
    }

    if (!image && initialFileUrl && !removed) {
      setUrl(initialFileUrl);
      return;
    }

    setUrl("");
  }, [image, initialFileUrl, removed]);

  return (
    <Controller
      name={FIELD_NAME}
      control={form.control}
      render={({ fieldState }) => (
        <Field
          data-invalid={fieldState.invalid}
          className="col-span-2 md:col-span-1"
        >
          <FieldLabel htmlFor="stock" className="gap-1">
            Image
          </FieldLabel>
          <Dropzone
            initialFileUrl={url}
            placeholder="Drag & drop a file"
            droppedCallback={(filelist) => {
              if (filelist && filelist[0]) {
                form.setValue(FIELD_NAME, filelist[0] as any, {
                  shouldValidate: true,
                  shouldDirty: true,
                });
              }
            }}
            deletedCallback={() => {
              setRemoved(true);
              form.setValue(FIELD_NAME, null as any, {
                shouldValidate: true,
                shouldDirty: true,
              });
            }}
            className="w-full h-full border"
          />
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}
