"use client";
import { useState } from "react";
import { AppShell } from "@/components/Shells";
import { PageHeader, Card, Input, Select, Textarea, Button, StatusBadge } from "@/components/ui";
import { issues } from "@/lib/data";
import type { Issue } from "@/lib/types";
import { formatDate } from "@/lib/utils";

export default function ReportIssuePage() {
  const [list, setList] = useState<Issue[]>(issues);
  const [form, setForm] = useState({ category: "Road", title: "", description: "", location: "" });
  const [toast, setToast] = useState<string | null>(null);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.title.length < 5 || form.description.length < 10) {
      setToast("Title (5+ chars) and description (10+ chars) required.");
      setTimeout(() => setToast(null), 2200);
      return;
    }
    const item: Issue = {
      id: `ISS-${300 + list.length + 1}`,
      title: form.title,
      category: form.category,
      description: form.description,
      location: form.location || "Pulchowk, Lalitpur",
      reporter: "Ram Sharma",
      status: "Reported",
      createdAt: new Date().toISOString().slice(0, 10),
      votes: 0,
    };
    setList([item, ...list]);
    setForm({ category: "Road", title: "", description: "", location: "" });
    setToast(`${item.id} submitted. Ward team will review within 2 days.`);
    setTimeout(() => setToast(null), 2500);
  };

  return (
    <AppShell>
      <PageHeader title="Report an Issue" subtitle="Streetlight, water, garbage, road — with location so the ward can find it." />
      <div className="grid gap-3 lg:grid-cols-2">
        <Card className="h-fit p-5">
          <form onSubmit={submit} className="space-y-3">
            <Select label="Category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
              <option>Road</option><option>Waste</option><option>Electricity</option><option>Water</option><option>Public Transport</option><option>Other</option>
            </Select>
            <Input label="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="e.g. Streetlight out near Pulchowk" />
            <Textarea label="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="What, since when, who is affected…" />
            <Input label="Location / Tole" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} placeholder="e.g. Bakhundole, Lalitpur-5" />
            <Input label="Photo (optional)" type="file" accept="image/*" />
            <Button className="w-full">Submit issue</Button>
          </form>
        </Card>
        <div className="space-y-2">
          <h2 className="font-semibold">Submitted ({list.length})</h2>
          {list.map((iss) => (
            <Card key={iss.id} className="p-4">
              <div className="flex items-center justify-between gap-2"><p className="font-medium">{iss.id} · {iss.title}</p><StatusBadge status={iss.status} /></div>
              <p className="mt-1 text-sm text-mutedtext">{iss.description}</p>
              <p className="mt-1 text-xs text-mutedtext">{iss.category} · {iss.location} · {formatDate(iss.createdAt)}</p>
            </Card>
          ))}
        </div>
      </div>
      {toast && <div className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2 rounded-md border border-green-200 bg-green-50 px-4 py-2 text-sm text-green-800">{toast}</div>}
    </AppShell>
  );
}
