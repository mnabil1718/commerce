import { PublicLayout } from "@/layouts/public";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PublicLayout>{children}</PublicLayout>;
}
