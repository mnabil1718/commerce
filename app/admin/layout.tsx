import { PrivateLayout } from "@/layouts/private";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();

  const user = data.user;

  if (!user || user.user_metadata.role !== "admin") {
    redirect("/dashboard");
  }

  return <PrivateLayout>{children}</PrivateLayout>;
}
