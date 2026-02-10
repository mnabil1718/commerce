import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";

export function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Navbar */}
      <Navbar />

      {/* Main content */}
      <main className="flex-1 mx-auto w-full max-w-5xl p-5">{children}</main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
