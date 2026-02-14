import { Toaster } from "sonner";
import { ThemeProvider } from "next-themes";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthStoreProvider } from "./auth.provider";
import { createClient } from "@/lib/supabase/server";
import { CartStoreProvider } from "./cart.provider";
import { ShippingAddressStoreProvider } from "./shipping-address.provider";
import { getShippingAddresses } from "@/service/shipping-address.service";

export async function AppProvider({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();

  const [{ data: userData }, { data: addrs }] = await Promise.all([
    supabase.auth.getUser(),
    getShippingAddresses(),
  ]);

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <AuthStoreProvider user={userData.user}>
        <ShippingAddressStoreProvider initialAddresses={addrs}>
          <TooltipProvider>
            <CartStoreProvider>{children}</CartStoreProvider>
          </TooltipProvider>
          <Toaster />
        </ShippingAddressStoreProvider>
      </AuthStoreProvider>
    </ThemeProvider>
  );
}
