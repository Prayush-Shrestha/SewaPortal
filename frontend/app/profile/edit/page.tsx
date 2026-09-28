"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { AppShell } from "@/components/Shells";
import { PageHeader, Card, Input, Select, Button } from "@/components/ui";
import { useAuth } from "@/lib/auth";

export default function EditProfilePage() {
  const { user } = useAuth();
  const router = useRouter();
  const [form, setForm] = useState({
    firstName: user?.firstName ?? "Ram",
    lastName: user?.lastName ?? "Sharma",
    username: user?.username ?? "ram.sharma",
    email: user?.email ?? "ram@example.com",
    phone: user?.phone ?? "98510-12345",
    dob: user?.dob ?? "1992-04-12",
    gender: user?.gender ?? "Male",
  });
  const [toast, setToast] = useState<string | null>(null);
  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => setForm({ ...form, [k]: e.target.value });

  const save = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const raw = localStorage.getItem("csp_user");
      if (raw) {
        const u = JSON.parse(raw);
        localStorage.setItem("csp_user", JSON.stringify({ ...u, ...form }));
      }
    } catch {}
    setToast("Profile saved.");
    setTimeout(() => { setToast(null); router.push("/profile"); }, 1500);
  };

  return (
    <AppShell>
      <PageHeader title="Edit Profile" subtitle="Keep phone and address current — the ward uses them for pickup calls." />
      <Card className="max-w-xl p-5">
        <form onSubmit={save} className="grid gap-3 sm:grid-cols-2">
          <Input label="First name" value={form.firstName} onChange={set("firstName")} required />
          <Input label="Last name" value={form.lastName} onChange={set("lastName")} required />
          <Input label="Username" value={form.username} onChange={set("username")} required />
          <Input label="Email" type="email" value={form.email} onChange={set("email")} required />
          <Input label="Phone" value={form.phone} onChange={set("phone")} />
          <Input label="Date of birth" type="date" value={form.dob} onChange={set("dob")} />
          <div className="sm:col-span-2">
            <Select label="Gender" value={form.gender} onChange={set("gender")}>
              <option>Male</option><option>Female</option><option>Other</option>
            </Select>
          </div>
          <div className="sm:col-span-2"><Button className="w-full sm:w-auto">Save changes</Button></div>
        </form>
      </Card>
      {toast && <div className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2 rounded-md border border-green-200 bg-green-50 px-4 py-2 text-sm text-green-800">{toast}</div>}
    </AppShell>
  );
}
