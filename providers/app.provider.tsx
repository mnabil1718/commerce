import { Toaster } from "sonner";
import { ThemeProvider } from "next-themes";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthStoreProvider } from "./auth.provider";
import { createClient } from "@/lib/supabase/server";

export async function AppProvider({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  const user = data.user;

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <AuthStoreProvider user={user}>
        <TooltipProvider>{children}</TooltipProvider>
        <Toaster />
      </AuthStoreProvider>
    </ThemeProvider>
  );
}
