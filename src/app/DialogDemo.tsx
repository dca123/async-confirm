"use client";
import { Button } from "@/components/ui/button";
import { useConfirm } from "./useConfirm";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";

export function DialogDemo() {
  const { Confirmation, getConfirmation } = useConfirm();
  const { toast } = useToast();

  const handleDeleteAccount = async () => {
    const result = await getConfirmation();
    if (result === true) {
      toast({
        title: "Account deleted",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Phew, that was close!",
      });
    }
  };

  return (
    <>
      <Button onClick={handleDeleteAccount}>Delete Account</Button>
      <Confirmation
        title="Are you sure?"
        description="This action is permanent. You cannot undo this action."
        confirmLabel="Delete Account"
      />
      <Toaster />
    </>
  );
}
