"use client";
import Link from "next/link";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import AdminSidebar from "./AdminSidebar";
import { useAuth } from "@/lib/auth";
import { Button } from "./ui";

export function PublicShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 py-6">{children}</main>
      <Footer />
    </div>
  );
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  if (!user) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <main className="mx-auto max-w-6xl px-4 py-10">
          <div className="mx-auto max-w-md rounded-lg border border-line bg-white p-6 text-center shadow-sm">
            <h1 className="font-semibold">Login required</h1>
            <p className="mt-1 text-sm text-mutedtext">Sign in to view this page. Demo data is shown after login. Use ram@example.com / any password, or admin@portal.np / admin123.</p>
            <div className="mt-4 flex justify-center gap-2">
              <Link href="/login"><Button>Login</Button></Link>
              <Link href="/register"><Button variant="outline">Register</Button></Link>
            </div>
            <div className="mt-4 border-t border-line pt-4 text-left text-sm text-mutedtext">
              <p className="font-medium text-ink">Preview (demo):</p>
              <p className="mt-1">Ram Sharma - NID-2026-1042 - National ID — Processing</p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 py-6">
        <div className="flex flex-col gap-4 lg:flex-row">
          <Sidebar />
          <div className="min-w-0 flex-1">{children}</div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export function AdminShell({ children }: { children: React.ReactNode }) {
  const { user, loginAsAdmin } = useAuth();
  if (!user || user.role !== "admin") {
    return (
      <div className="min-h-screen">
        <Navbar />
        <main className="mx-auto max-w-6xl px-4 py-10">
          <div className="mx-auto max-w-md rounded-lg border border-line bg-white p-6 text-center shadow-sm">
            <h1 className="font-semibold">Admin access only</h1>
            <p className="mt-1 text-sm text-mutedtext">Sign in as admin@portal.np / admin123 to manage users, applications and reports.</p>
            <div className="mt-4 flex justify-center gap-2">
              <Button onClick={loginAsAdmin}>Login as admin</Button>
              <Link href="/login"><Button variant="outline">Go to login</Button></Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 py-6">
        <div className="flex flex-col gap-4 lg:flex-row">
          <AdminSidebar />
          <div className="min-w-0 flex-1">{children}</div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
