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
  HStack,
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
      <Dialog.Root open={isOpen} onOpenChange={(e) => onOpenChange(!!e.open)}>
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content>
              <Dialog.Header>
                <Heading size="lg" mx='6' mt='4' mb='2'>Add staff</Heading>
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
                    <Text>Name</Text>
                    <Input name="name" placeholder="Name" />
                    <Text>Email</Text>
                    <Input name="email" placeholder="Email" type="email" required />
                    <Text>phone</Text>
                    <Input name="phone" placeholder="Phone (10 digits)" required />
                    <Text>Password</Text>
                    <Input name="password" placeholder="Password" type="password" required />
                    <HStack>
                      <Button type="submit" backgroundColor={"black"} px='2' fontWeight={"bold"} color={"white"} disabled={isPending}>
                        {isPending ? "Adding..." : "Add staff"}
                      </Button>
                      <Button variant="ghost" backgroundColor={"white"} borderColor={"black"} borderWidth={1} px='2' fontWeight={"bold"} onClick={onClose}>
                        Cancel
                      </Button>

                    </HStack>
                  </Flex>
                </form>
              </Dialog.Body>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </>
  );
}


