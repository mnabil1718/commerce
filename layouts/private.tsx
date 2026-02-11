import { AppSidebar } from "@/components/private/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

export function PrivateLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <main className="flex-1">{children}</main>
      </div>
    </SidebarProvider>
  );
}
