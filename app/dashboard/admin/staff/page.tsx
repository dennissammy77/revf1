import { UserService } from "@/modules/users/user.service";
import StaffTable from "./staff-table";

export default async function UserList({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const service = new UserService();
  const sp = await searchParams;
  const q = (sp?.q ?? "").toString();
  const staff = await service.listUsersByRole("staff", q);
  return (
    <StaffTable 
      staff={staff} 
      initialSearch={q} 
    />
  );
}
