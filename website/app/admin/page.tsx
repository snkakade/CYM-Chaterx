import { redirect } from "next/navigation";
import { AdminDashboard } from "@/components/AdminDashboard";
import { getDashboardData } from "@/lib/admin-data";
import { getAdminSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");
  const data = await getDashboardData();
  return <AdminDashboard data={data} adminEmail={session.email} />;
}
