import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Loader2, Upload, X } from "lucide-react";
import Image from "next/image";
import React, { ChangeEvent, useRef, useState } from "react";

type DropzoneProps = {
  className?: string;
  placeholder?: string;
  accept?: string;
  initialFileUrl?: string | null;
  droppedCallback: (acceptedFiles: FileList | null) => void;
  deletedCallback: () => void;
};

export function Dropzone({
  className = "",
  placeholder = "Drag & drop file to upload",
  accept = ".jpg,.jpeg,.png,.webp",
  initialFileUrl = null,
  droppedCallback,
  deletedCallback,
}: DropzoneProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDraggedOver, setIsDraggedOver] = useState<boolean>(false);

  // Function to handle drop and manage loading state
  const processing = (files: FileList | null) => {
    setIsLoading(true);
    droppedCallback(files);
    setIsLoading(false);
  };

  const draggedOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggedOver(true);
  };

  const draggedLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggedOver(false);
  };

  const dropped = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const { files } = e.dataTransfer;
    if (inputRef.current) {
      inputRef.current.files = files;
      processing(files);
    }
  };

  const fileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      processing(files);
    }
  };

  const clicked = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const remove = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (inputRef.current) {
      inputRef.current.value = "";
      deletedCallback();
    }
  };

  return (
    <Card
      className={cn(
        className,
        `p-0 gap-0 aspect-video flex items-center justify-center border-2 border-dashed hover:cursor-pointer overflow-hidden`,
        isDraggedOver ? "border-primary" : "border-primary/30",
        !isDraggedOver ? "bg-accent/20" : "bg-accent/50",
      )}
    >
      <CardContent
        className="flex w-full h-full items-center justify-center p-0 text-xs"
        onDrop={dropped}
        onDragOver={draggedOver}
        onDragLeave={draggedLeave}
        onClick={clicked}
      >
        {/* LOADING SPINNER */}
        {isLoading && (
          <div className="absolute bottom-1 right-1 animate-spin">
            <Loader2 width={16} height={16} className="text-primary" />
          </div>
        )}

        <div className="flex flex-col items-center text-muted-foreground gap-3">
          {!initialFileUrl && (
            <>
              <Upload size={28} className="opacity-50" />
              <span className="font-medium hover:underline">{placeholder}</span>
            </>
          )}

          <Input
            value={undefined}
            ref={inputRef}
            type="file"
            multiple={false}
            accept={accept}
            className="hidden"
            onChange={fileChange}
          />
        </div>

        {initialFileUrl && initialFileUrl !== "" && (
          <div className="relative w-full h-full justify-center group">
            <Image
              src={initialFileUrl}
              alt="Thumbnail Preview"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-contain"
            />

            <div className="absolute right-2 top-2 transition duration-200">
              <button
                type="button"
                onClick={remove}
                className="rounded-full bg-destructive text-destructive-foreground p-1.5 flex justify-center items-center opacity-60 hover:opacity-100"
              >
                <X size={16} />
              </button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
