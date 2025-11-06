import { UserService } from "@/modules/users/user.service";
import UsersTable from "./userTable";

export default async function UserList({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const service = new UserService();
  const sp = await searchParams;
  const q = (sp?.q ?? "").toString();
  const users = await service.listUsersByRole("user", q);
  return (
    <UsersTable 
      users={users} 
      initialSearch={q} 
    />
  );
};