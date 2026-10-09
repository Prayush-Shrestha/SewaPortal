"use client";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { AppShell } from "@/components/Shells";
import { Card, Button, Input, Textarea, Modal } from "@/components/ui";
import { services } from "@/lib/data";
import { formatNPR } from "@/lib/utils";
import { useAuth } from "@/lib/auth";
import { CheckCircle2, Clock, MapPin } from "lucide-react";

export default function ServiceDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const service = services.find((s) => s.slug === params.slug) ?? services[0];
  const [open, setOpen] = useState(false);
  const [done, setDone] = useState<string | null>(null);
  const [form, setForm] = useState({ fullName: user ? `${user.firstName} ${user.lastName}` : "Ram Sharma", phone: "98510-12345", notes: "" });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = `NID-2026-${Math.floor(1050 + Math.random() * 200)}`;
    try {
      const raw = localStorage.getItem("csp_apps");
      const arr = raw ? JSON.parse(raw) : [];
      arr.push({ id, service: service.name, applicant: form.fullName });
      localStorage.setItem("csp_apps", JSON.stringify(arr));
    } catch {}
    setOpen(false);
    setDone(id);
  };

  return (
    <AppShell>
      <button onClick={() => router.back()} className="mb-3 text-sm text-mutedtext hover:text-primary">← All services</button>
      <div className="grid gap-3 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card className="p-5">
            <span className="rounded bg-stone-100 px-2 py-0.5 text-xs text-stone-600">{service.category}</span>
            <h1 className="mt-2 text-xl font-semibold">{service.name}</h1>
            <p className="mt-1 text-sm text-mutedtext">{service.description}</p>
            <div className="mt-3 flex flex-wrap gap-4 text-sm">
              <span className="font-semibold text-primary">{formatNPR(service.fee)}</span>
              <span className="flex items-center gap-1 text-mutedtext"><Clock size={14} /> {service.processingTime}</span>
              <span className="flex items-center gap-1 text-mutedtext"><MapPin size={14} /> {service.office}</span>
            </div>
            <h2 className="mt-5 font-semibold">Required documents</h2>
            <ul className="mt-2 space-y-1.5">
              {service.requiredDocs.map((d) => (
                <li key={d} className="flex items-start gap-2 rounded-md border border-line p-2 text-sm">
                  <CheckCircle2 size={15} className="mt-0.5 text-green-600" /> {d}
                </li>
              ))}
            </ul>
            <h2 className="mt-5 font-semibold">Steps</h2>
            <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm text-stone-600">
              <li>Fill the application with your name and phone.</li>
              <li>Attach documents from My Documents.</li>
              <li>Pay {formatNPR(service.fee)} via eSewa / Khalti.</li>
              <li>Collect from {service.office} with receipt + originals.</li>
            </ol>
          </Card>
        </div>
        <Card className="h-fit p-5">
          <p className="text-sm text-mutedtext">Fee payable</p>
          <p className="text-2xl font-semibold">{formatNPR(service.fee)}</p>
          <p className="text-xs text-mutedtext">{service.processingTime} · receipt issued instantly</p>
          {done ? (
            <div className="mt-4 rounded-md bg-green-50 p-3 text-sm text-green-800">
              Application {done} created. <button onClick={() => router.push("/applications")} className="link">Track it →</button>
            </div>
          ) : (
            <Button className="mt-4 w-full" onClick={() => setOpen(true)}>Apply now</Button>
          )}
          <p className="mt-2 text-xs text-mutedtext">Sita Thapa applied for citizenship on Sep 15 — now Under Review.</p>
        </Card>
      </div>

      <Modal open={open} onClose={() => setOpen(false)} title={`Apply — ${service.name}`}>
        <form onSubmit={submit} className="space-y-3">
          <Input label="Full name" value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} required />
          <Input label="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} required />
          <Textarea label="Notes for ward officer" value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} placeholder="e.g. Hospital record attached, pickup after Tihar" />
          <p className="text-xs text-mutedtext">Fee {formatNPR(service.fee)} is paid after submission. Documents can be attached from My Documents.</p>
          <Button className="w-full">Submit application</Button>
        </form>
      </Modal>
    </AppShell>
  );
}
