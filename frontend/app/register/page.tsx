"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button, Card, Input } from "@/components/ui";
import { useAuth } from "@/lib/auth";

export default function RegisterPage() {
  const { register } = useAuth();
  const router = useRouter();
  const [form, setForm] = useState({ firstName: "Sita", lastName: "Thapa", username: "sita.thapa", email: "sita@example.com", phone: "98410-56789", password: "password123" });
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);
  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => setForm({ ...form, [k]: e.target.value });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr("");
    if (!form.email.includes("@")) { setErr("Enter a valid email."); return; }
    if (form.password.length < 6) { setErr("Password must be at least 6 characters."); return; }
    if (!form.firstName || !form.lastName) { setErr("First and last name required."); return; }
    setBusy(true);
    try {
      await register(form);
      router.push("/dashboard");
    } catch (e: unknown) {
      setErr(e instanceof Error ? e.message : "Registration failed.");
    } finally { setBusy(false); }
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="mx-auto max-w-md px-4 py-10">
        <Card className="p-6">
          <h1 className="text-lg font-semibold">Create account</h1>
          <p className="mt-1 text-sm text-mutedtext">Free for residents of Kathmandu Valley wards.</p>
          <form onSubmit={submit} className="mt-4 space-y-3">
            <div className="grid grid-cols-2 gap-2">
              <Input label="First name" value={form.firstName} onChange={set("firstName")} />
              <Input label="Last name" value={form.lastName} onChange={set("lastName")} />
            </div>
            <Input label="Username" value={form.username} onChange={set("username")} />
            <Input label="Email" type="email" value={form.email} onChange={set("email")} />
            <Input label="Phone" value={form.phone} onChange={set("phone")} placeholder="98XXXXXXXX" />
            <Input label="Password" type="password" value={form.password} onChange={set("password")} />
            {err && <p className="text-sm text-red-600">{err}</p>}
            <Button className="w-full" disabled={busy}>{busy ? "Creating…" : "Register"}</Button>
          </form>
          <p className="mt-3 text-sm text-mutedtext">Have an account? <Link href="/login" className="text-primary hover:underline">Login</Link></p>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
