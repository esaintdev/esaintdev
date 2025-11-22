"use client";

import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { usePathname } from "next/navigation";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith("/admin");

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <title>Fullstack Developer Portfolio</title>
        <meta name="description" content="A sleek, modern portfolio showcasing my work." />
      </head>
      <body
        className={`${inter.variable} ${outfit.variable} antialiased bg-background text-foreground`}
        suppressHydrationWarning
      >
        {!isAdminRoute && <Navbar />}
        <main className={!isAdminRoute ? "min-h-screen pt-16 md:pt-20" : "min-h-screen"}>
          {children}
        </main>
        {!isAdminRoute && <Footer />}
      </body>
    </html>
  );
}
