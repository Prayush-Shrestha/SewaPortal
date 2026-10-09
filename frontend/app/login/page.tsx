"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button, Card, Input } from "@/components/ui";
import { useAuth } from "@/lib/auth";

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("ram@example.com");
  const [password, setPassword] = useState("password123");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr("");
    if (!email.includes("@")) { setErr("Enter a valid email."); return; }
    if (password.length < 6) { setErr("Password must be at least 6 characters."); return; }
    setBusy(true);
    try {
      const u = await login(email, password);
      router.push(u.role === "admin" ? "/admin" : "/dashboard");
    } catch (e: unknown) {
      setErr(e instanceof Error ? e.message : "Login failed.");
    } finally { setBusy(false); }
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="mx-auto max-w-md px-4 py-10">
        <Card className="p-6">
          <h1 className="text-lg font-semibold">Welcome back</h1>
          <p className="mt-1 text-sm text-mutedtext">Login to track applications and pay taxes.</p>
          <form onSubmit={submit} className="mt-4 space-y-3">
            <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="ram@example.com" />
            <Input label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />
            {err && <p className="text-sm text-red-600">{err}</p>}
            <Button className="w-full" disabled={busy}>{busy ? "Signing in…" : "Login"}</Button>
          </form>
          <div className="mt-4 rounded-md bg-stone-50 p-3 text-xs text-mutedtext">
            <p className="font-medium text-ink">Demo credentials</p>
            <p>User: ram@example.com / password123</p>
            <p>Admin: admin@portal.np / admin123</p>
          </div>
          <div className="mt-3 flex justify-between text-sm">
            <Link href="/register" className="text-primary hover:underline">Create account</Link>
            <Link href="/auth/forgot-password" className="text-mutedtext hover:underline">Forgot password?</Link>
          </div>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
