import { PublicLayout } from "@/layouts/public";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();

  const user = data.user;

  if (!user || user.user_metadata.role !== "user") {
    redirect("/admin/dashboard");
  }

  return <PublicLayout>{children}</PublicLayout>;
}
