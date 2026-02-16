"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Ellipsis } from "lucide-react";
import { MouseEvent, useState } from "react";

export function ConfirmDialog({
  trigger,
  text = "This action will perform an action to this resource. Do you wish to continue?",
  buttonText = "Confirm",
  confirmCallback,
}: {
  text?: string;
  buttonText?: string;
  trigger: React.ReactNode;
  confirmCallback: (e: MouseEvent<HTMLButtonElement>) => Promise<void> | void;
}) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleConfirm = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    setLoading(true);

    await confirmCallback(e);
    setOpen(false);
    setLoading(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>{text}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={loading}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirm}
            variant={"default"}
            disabled={loading}
            className="min-w-20"
          >
            {loading ? <Ellipsis className="animate-pulse" /> : buttonText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
