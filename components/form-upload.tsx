"use client";

import { useSupabaseUpload } from "@/hooks/use-supabase-upload";
import { Dropzone, DropzoneContent, DropzoneEmptyState } from "./dropzone";
import { Path, PathValue, useFormContext } from "react-hook-form";
import { useEffect } from "react";
import Image from "next/image";
import { getPublicUrl } from "@/utils/storage";
import { X } from "lucide-react";

export type FormUploadProps = {
  bucketName?: string;
  path?: string;
};

export function FormUpload<T extends { image?: string }>({
  bucketName = "uploads",
  path = "images",
}: FormUploadProps) {
  const FIELD_NAME = "image" as Path<T>;
  const form = useFormContext<T>();

  const props = useSupabaseUpload({
    path,
    bucketName,
    maxFiles: 1,
    maxFileSize: 1000 * 1000 * 3,
    allowedMimeTypes: ["image/*"],
  });

  useEffect(() => {
    // 1. Reset on Mount: Ensure we start clean
    props.setFiles([]);
    props.setSuccesses([]);
    props.setErrors([]);

    // 2. Cleanup on Unmount: Wipe state when the user leaves the page
    return () => {
      props.setFiles([]);
      props.setSuccesses([]);
      props.setErrors([]);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (props.isSuccess && props.successes.length > 0) {
      const url = getPublicUrl(bucketName, `${path}/${props.successes[0]}`);

      const currentImage = form.getValues(FIELD_NAME);

      if (currentImage !== url) {
        form.setValue(FIELD_NAME, url as PathValue<T, Path<T>>, {
          shouldValidate: true,
          shouldDirty: true,
        });
      }
    }
  }, [props.isSuccess, props.successes, form, bucketName, path]);

  const remove = () => {
    form.setValue(FIELD_NAME, undefined as PathValue<T, Path<T>>, {
      shouldValidate: true,
      shouldDirty: true,
    });

    props.setFiles([]);
    props.setErrors([]);
    props.setSuccesses([]);
  };

  const image = form.watch(FIELD_NAME);

  return (
    <>
      {!image ? (
        <Dropzone
          {...props}
          className="w-full h-full flex flex-col justify-center items-center"
        >
          <DropzoneEmptyState className="w-full" />
          <DropzoneContent className="w-full" />
        </Dropzone>
      ) : (
        <div className="relative group w-full aspect-video rounded-xl overflow-hidden">
          <button
            type="button"
            onClick={remove}
            className="absolute right-2.5 top-2.5 p-1 rounded-full z-10 bg-primary opacity-80 hover:opacity-100 transition-all duration-200"
          >
            <X className="text-primary-foreground" />
          </button>

          <Image
            fill
            src={image ?? "#"}
            alt={image ?? "#"}
            sizes="(max-width: 480px) 100vw, (max-width: 240px) 50vw, 33vw"
            className="w-full object-cover"
          />
        </div>
      )}
    </>
  );
}
