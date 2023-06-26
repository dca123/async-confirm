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
} from "@/components/ui/alert-dialog";
import { useRef, useState } from "react";

export const useConfirm = () => {
  const [isOpen, setOpen] = useState(false);
  const resolver = useRef<null | ((value: boolean) => void)>(null);

  const getConfirmation = () => {
    setOpen(true);
    const promise = new Promise<boolean>((r) => {
      resolver.current = r;
    });
    return promise;
  };

  const onClick = (value: boolean) => {
    setOpen(false);
    if (resolver.current === null) {
      throw new Error(
        "Resolver hasn't been set ! This is caused when you call onClick() before calling getConfirmation()"
      );
    }
    resolver.current(value);
  };

  const handleConfirm = () => onClick(true);
  const handleCancel = () => onClick(false);

  type ConfirmationProps = {
    title: React.ReactNode;
    description: React.ReactNode;
    confirmLabel: string;
  };
  const Confirmation = (props: ConfirmationProps) => {
    return (
      <AlertDialog open={isOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{props.title}</AlertDialogTitle>
            <AlertDialogDescription>{props.description}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleCancel}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirm}>
              {props.confirmLabel}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  };

  return { getConfirmation, Confirmation };
};
