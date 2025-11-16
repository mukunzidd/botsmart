import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { MobileBottomNav } from "@/components/mobile-bottom-nav";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  fallback: ["system-ui", "arial"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: "#32A852",
};

export const metadata: Metadata = {
  title: "BotsMart - Grocery Delivery in Botswana",
  description: "Order groceries from your favorite stores in Gaborone and Francistown. Fast delivery, fresh products.",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "BotsMart",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased bg-background`}>
        <Header />
        <main className="min-h-screen pb-16 md:pb-0 pt-2">
          {children}
        </main>
        <Footer />
        <MobileBottomNav />
      </body>
    </html>
  );
}
