import { Toaster } from "sonner";
import { ThemeProvider } from "next-themes";
import { TooltipProvider } from "@/components/ui/tooltip";
// import { AuthStoreProvider } from "./auth.provider";

export function AppProvider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {/* <AuthStoreProvider> */}
      <TooltipProvider>{children}</TooltipProvider>
      <Toaster />
      {/* </AuthStoreProvider> */}
    </ThemeProvider>
  );
}
