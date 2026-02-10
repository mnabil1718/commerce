export function PrivateLayout({ children }: { children: React.ReactNode }) {
  return (
    // <div className="min-h-screen flex flex-col bg-background">
    //   <Navbar />
    //   <main className="flex-1 mx-auto w-full max-w-5xl p-5">{children}</main>
    //   <Footer />
    // </div>
    // <SidebarProvider>
    //   <AppSidebar />
    //   <main>
    //     <SidebarTrigger />
    <>{children}</>
    //   </main>
    // </SidebarProvider>
  );
}
