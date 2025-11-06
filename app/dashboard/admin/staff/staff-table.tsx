"use client";

import {
  Box,
  Button,
  Flex,
  Avatar,
  Badge,
  Heading,
  Input,
  IconButton,
  Table,
  Checkbox,
  Text,
  HStack,
  Spacer,
} from "@chakra-ui/react";
import AddStaffDialog from "@/components/ui/add-staff-modal";
import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const statusColor = {
  Active: "green",
  Pending: "yellow",
  Banned: "red",
} as const;

function getStatus(user: any): { label: keyof typeof statusColor } {
  if (user.isSuspended || user.isDeleted) return { label: "Banned" } as const;
  if (!user.isVerified) return { label: "Pending" } as const;
  return { label: "Active" } as const;
}

export default function StaffTable({ staff, initialSearch = "" }: { staff: any[]; initialSearch?: string }) {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [search, setSearch] = useState(initialSearch);
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  useEffect(() => {
    setSearch(initialSearch);
  }, [initialSearch]);

  useEffect(() => {
    const id = setTimeout(() => {
      const q = search.trim();
      const usp = new URLSearchParams(params?.toString());
      if (q) {
        usp.set("q", q);
      } else {
        usp.delete("q");
      }
      router.replace(`${pathname}?${usp.toString()}`);
    }, 300);
    return () => clearTimeout(id);
  }, [search, pathname, params, router]);
  return (
    <Box p={6} bg="gray.50" minH="100vh">
      <Flex mb={6} align="center">
        <Heading size="4xl">Staff</Heading>
        <Spacer />
        <HStack>
          <Input
            placeholder="Search name, email, or phone"
            bg="gray.200"
            borderColor={"slate.500"}
            borderWidth={0}
            px="2"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button backgroundColor={"black"} px='2' fontWeight={"bold"} color={"white"} onClick={() => setDialogOpen(true)}>
            Add staff
          </Button>
        </HStack>
      </Flex>
      <AddStaffDialog isOpen={isDialogOpen} onOpenChange={setDialogOpen} />

      <Box bg="white" borderRadius="md" p={3} boxShadow="sm" color={"black"}>
        {!(staff && staff.length > 0) ? (
          <Flex direction="column" align="center" justify="center" py={16} gap={2}>
            <Heading size="lg">No users found</Heading>
            <Text color="gray.500">Invite or add your first staff member.</Text>
            <Button backgroundColor={"black"} px='2' fontWeight={"bold"} color={"white"} onClick={() => setDialogOpen(true)}>
              Add staff
            </Button>
          </Flex>
        ) : (
        <Table.Root>
          <Table.Header>
            <Table.Row >
              <Table.ColumnHeader color={"black"}>Name</Table.ColumnHeader>
              <Table.ColumnHeader color={"black"}>Phone number</Table.ColumnHeader>
              <Table.ColumnHeader color={"black"}>Email</Table.ColumnHeader>
              <Table.ColumnHeader color={"black"}>Role</Table.ColumnHeader>
              <Table.ColumnHeader color={"black"}>Status</Table.ColumnHeader>
              <Table.ColumnHeader color={"black"}>Action</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {staff?.map((u) => {
              const status = getStatus(u as any);
              return (
              <Table.Row key={u.id} padding={16}>
                <Table.Cell >
                  <HStack>
                    <Avatar.Root size="sm">
                      <Avatar.Fallback />
                      <Avatar.Image src={u?.avatar ?? String(u?.avatar ?? "")} />
                    </Avatar.Root>
                    <Box>
                      <Text fontWeight="medium" color="gray.500">{u.name}</Text>
                      <Text fontSize="sm" color="gray.500">
                        {u.email}
                      </Text>
                    </Box>
                  </HStack>
                </Table.Cell >
                <Table.Cell color="gray.500">{u.phone}</Table.Cell >
                <Table.Cell color="gray.500">{u.email}</Table.Cell >
                <Table.Cell color="gray.500">{u.role}</Table.Cell >
                <Table.Cell >
                  <Badge colorScheme={statusColor[status.label]}>
                    {status.label}
                  </Badge>
                </Table.Cell >
                <Table.Cell >
                  <HStack>
                    <IconButton
                      size="sm"
                      aria-label="edit"
                      variant="ghost"
                    />
                    <IconButton
                      size="sm"
                      aria-label="menu"
                      variant="ghost"
                    />
                  </HStack>
                </Table.Cell >
              </Table.Row >
              );
            })}
          </Table.Body>
        </Table.Root>
        )}

        {staff && staff.length > 0 && (
          <Flex justify="space-between" align="center" mt={4}>
            <Text fontSize="sm">Rows per page: 5</Text>
            <Text fontSize="sm">1–5 of 20</Text>
          </Flex>
        )}
      </Box>
    </Box>
  );
}


