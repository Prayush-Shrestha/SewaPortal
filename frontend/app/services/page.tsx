"use client";
import { useState } from "react";
import Link from "next/link";
import { AppShell } from "@/components/Shells";
import { PageHeader, Card, Input, Select } from "@/components/ui";
import { services } from "@/lib/data";
import { formatNPR } from "@/lib/utils";
import { Clock } from "lucide-react";

export default function ServicesPage() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("All");
  const cats = ["All", ...Array.from(new Set(services.map((s) => s.category)))];
  const filtered = services.filter(
    (s) => (cat === "All" || s.category === cat) && (s.name.toLowerCase().includes(q.toLowerCase()) || s.description.toLowerCase().includes(q.toLowerCase()))
  );

  return (
    <AppShell>
      <PageHeader title="Services" subtitle="National ID, Driving License, PAN, Voter Card and Bluebook — fee and documents listed upfront." />
      <div className="mb-4 grid gap-2 sm:grid-cols-[1fr_200px]">
        <Input placeholder="Search National ID, License, PAN…" value={q} onChange={(e) => setQ(e.target.value)} />
        <Select value={cat} onChange={(e) => setCat(e.target.value)} aria-label="Filter category">
          {cats.map((c) => <option key={c}>{c}</option>)}
        </Select>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {filtered.map((s) => (
          <Card key={s.slug} className="p-4">
            <div className="flex items-center justify-between text-xs">
              <span className="rounded bg-stone-100 px-2 py-0.5 text-stone-600">{s.category}</span>
              <span className="font-semibold text-primary">{formatNPR(s.fee)}</span>
            </div>
            <h2 className="mt-2 font-semibold">{s.name}</h2>
            <p className="mt-1 text-sm text-mutedtext">{s.description}</p>
            <ul className="mt-2 space-y-1 text-xs text-mutedtext">
              {s.requiredDocs.slice(0, 3).map((d) => <li key={d}>• {d}</li>)}
            </ul>
            <p className="mt-2 flex items-center gap-1 text-xs text-mutedtext"><Clock size={13} /> {s.processingTime}</p>
            <Link href={`/services/${s.slug}`} className="mt-3 inline-flex h-9 items-center rounded-md bg-primary px-3 text-sm text-white hover:bg-primary-dark">
              View & apply
            </Link>
          </Card>
        ))}
      </div>
      {filtered.length === 0 && <p className="mt-6 text-center text-sm text-mutedtext">No services match “{q}”. Try “license” or “PAN”.</p>}
    </AppShell>
  );
}
