import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/providers/app.provider";
import { Suspense } from "react";
import Script from "next/script";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Next.js and Supabase Starter Kit",
  description: "The fastest way to build apps with Next.js and Supabase",
};

const geistSans = DM_Sans({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.className} antialiased bg-background text-foreground`}
      >
        <Suspense>
          <AppProvider>{children}</AppProvider>
        </Suspense>
        <Script
          src="https://app.sandbox.midtrans.com/snap/snap.js"
          // Get this from your Midtrans Dashboard
          data-client-key={process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY}
          // 'beforeInteractive' loads before Hydration
          // 'afterInteractive' (default) loads after Hydration
          strategy="beforeInteractive"
        />
      </body>
    </html>
  );
}
