"use client";
import { useState } from "react";
import Link from "next/link";
import { AppShell } from "@/components/Shells";
import { PageHeader, Button, Card, Badge, EmptyState, Select } from "@/components/ui";
import { documents } from "@/lib/data";
import { maskDocNumber, formatDate } from "@/lib/utils";
import { Upload, FileText, BadgeCheck } from "lucide-react";

export default function DocumentsPage() {
  const [cat, setCat] = useState("All");
  const [toast, setToast] = useState<string | null>(null);
  const filtered = cat === "All" ? documents : documents.filter((d) => d.category === cat);

  const upload = () => {
    setToast("Document uploaded — pending verification.");
    setTimeout(() => setToast(null), 2200);
  };

  return (
    <AppShell>
      <PageHeader title="Document Vault" subtitle="Keep your important documents organized and easy to access." action={<Button onClick={upload}><Upload size={15} /> Upload Document</Button>} />
      <div className="mb-3 flex max-w-xs">
        <Select value={cat} onChange={(e) => setCat(e.target.value)} aria-label="Category filter">
          {["All", "Citizenship", "National ID", "Passport", "PAN Card", "Driving License", "Bluebook"].map((c) => <option key={c}>{c}</option>)}
        </Select>
      </div>
      {filtered.length === 0 ? (
        <EmptyState title="No documents yet" body="Your document vault is empty. Upload your first document to keep it organized." action={<Button onClick={upload}>Upload Document</Button>} />
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          {filtered.map((d) => (
            <Card key={d.id} className="p-4">
              <div className="flex items-start justify-between gap-2">
                <span className="flex h-9 w-9 items-center justify-center rounded-md bg-primary-light text-primary"><FileText size={17} /></span>
                <Badge className={d.verified ? "bg-green-50 text-green-700 border-green-200" : "bg-amber-50 text-amber-700 border-amber-200"}>
                  {d.verified ? "Verified" : "Pending"}
                </Badge>
              </div>
              <h3 className="mt-2 font-semibold">{d.name}</h3>
              <p className="text-sm text-mutedtext">{d.fileName} · {d.size} · {formatDate(d.uploadedAt)}</p>
              <p className="mt-1 flex items-center gap-1 text-sm">No. {maskDocNumber(d.docNumber)} {d.verified && <BadgeCheck size={14} className="text-green-600" />}</p>
              <div className="mt-3 flex gap-2">
                <Link href={`/documents/${d.id}`} className="inline-flex h-9 items-center rounded-md border border-line px-3 text-sm hover:bg-stone-50">Open</Link>
                <span className="inline-flex h-9 items-center rounded-md bg-stone-50 px-3 text-xs text-mutedtext">{d.category}</span>
              </div>
            </Card>
          ))}
        </div>
      )}
      {toast && <div className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2 rounded-md border border-green-200 bg-green-50 px-4 py-2 text-sm text-green-800">{toast}</div>}
    </AppShell>
  );
}
