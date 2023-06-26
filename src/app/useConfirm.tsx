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
import { useState } from "react";

export const useConfirm = () => {
  const [isOpen, setOpen] = useState(false);
  const [resolver, setResolver] = useState<{
    resolve: null | ((value: boolean | PromiseLike<boolean>) => void);
  }>({
    resolve: null,
  });

  const getConfirmation = () => {
    setOpen(true);
    const promise = new Promise<boolean>((resolver) =>
      setResolver({ resolve: resolver })
    );
    return promise;
  };

  const onClick = (value: boolean) => {
    setOpen(false);
    if (resolver.resolve === null) {
      throw new Error(
        "Resolver hasn't been set ! This is caused when you don't call getConfirmation() before calling onClick()"
      );
    }
    resolver.resolve(value);
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
