"use client";
import { useState } from "react";
import { AdminShell } from "@/components/Shells";
import { PageHeader, Card, Input, StatusBadge, Button } from "@/components/ui";
import { documents } from "@/lib/data";
import { maskDocNumber } from "@/lib/utils";

export default function AdminDocumentsPage() {
  const [q, setQ] = useState("");
  const [toast, setToast] = useState<string | null>(null);
  const filtered = documents.filter((d) => (d.name + d.docNumber + d.category).toLowerCase().includes(q.toLowerCase()));

  const verify = (name: string, ok: boolean) => {
    setToast(`${name} ${ok ? "verified" : "flagged for re-upload"}.`);
    setTimeout(() => setToast(null), 2000);
  };

  return (
    <AdminShell>
      <PageHeader title="Documents" subtitle="Verify uploads from citizens" action={<Input placeholder="Search…" value={q} onChange={(e) => setQ(e.target.value)} />} />
      <Card className="p-0">
        <div className="table-wrap border-0">
          <table className="data">
            <thead><tr><th>Document</th><th>Number</th><th>Category</th><th>Status</th><th>Actions</th></tr></thead>
            <tbody>
              {filtered.map((d) => (
                <tr key={d.id}>
                  <td className="font-medium">{d.name}<br /><span className="text-xs font-normal text-mutedtext">{d.fileName} · {d.size}</span></td>
                  <td>{maskDocNumber(d.docNumber)}</td><td>{d.category}</td>
                  <td><StatusBadge status={d.verified ? "Verified" : "Pending"} /></td>
                  <td><div className="flex gap-1"><Button size="sm" onClick={() => verify(d.name, true)}>Verify</Button><Button size="sm" variant="outline" onClick={() => verify(d.name, false)}>Flag</Button></div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
      {toast && <div className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2 rounded-md border border-green-200 bg-green-50 px-4 py-2 text-sm text-green-800">{toast}</div>}
    </AdminShell>
  );
}
