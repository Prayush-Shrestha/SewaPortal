import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AuthProvider } from "@/lib/auth";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Community Services Portal — Nepal",
  description: "National ID, driving license, PAN, voter card and bluebook services in one place.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen bg-page text-ink`}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
