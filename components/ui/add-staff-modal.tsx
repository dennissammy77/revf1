"use client";

import { useTransition } from "react";
import {
  Button,
  Flex,
  Heading,
  Input,
  Dialog,
  Text,
  Portal,
} from "@chakra-ui/react";
import { addStaffAction } from "@/app/actions/user";
import { useRouter } from "next/navigation";

interface AddStaffDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function AddStaffDialog({ isOpen, onOpenChange }: AddStaffDialogProps) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  function onClose() {
    onOpenChange(false);
  }

  async function handleAction(formData: FormData) {
    const payload = {
      name: String(formData.get("name") || ""),
      email: String(formData.get("email") || ""),
      phone: String(formData.get("phone") || ""),
      password: String(formData.get("password") || ""),
    };
    const res = await addStaffAction(payload as any);
    if (res?.ok) {
      router.refresh();
      onClose();
    }
  }

  return (
    <>
      <Dialog.Root open={isOpen} onOpenChange={(e) => onOpenChange(!!e.open)} >
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content>
              <Dialog.Header>
                <Heading size="lg">Add staff</Heading>
              </Dialog.Header>
              <Dialog.Body p={6}>
                <form
                  action={(formData: FormData) =>
                    startTransition(() => {
                      handleAction(formData);
                    })
                  }
                >
                  <Flex direction="column" gap={3}>
                    <Input name="name" placeholder="Name (optional)" />
                    <Input name="email" placeholder="Email" type="email" required />
                    <Input name="phone" placeholder="Phone (10 digits)" required />
                    <Input name="password" placeholder="Password" type="password" required />
                    <Button type="submit" backgroundColor={"black"} px='2' fontWeight={"bold"} color={"white"} disabled={isPending}>
                      {isPending ? "Adding..." : "Add staff"}
                    </Button>
                  </Flex>
                </form>
              </Dialog.Body>
              <Dialog.Footer>
                <Button variant="ghost" onClick={onClose}>Cancel</Button>
              </Dialog.Footer>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </>
  );
}


