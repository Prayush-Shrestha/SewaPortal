"use client";
import { useState } from "react";
import { AdminShell } from "@/components/Shells";
import { PageHeader, Card, Input, StatusBadge, Button } from "@/components/ui";
import { fines } from "@/lib/data";
import type { Fine } from "@/lib/types";
import { formatNPR, formatDate } from "@/lib/utils";

export default function AdminFinesPage() {
  const [list, setList] = useState<Fine[]>(fines);
  const [q, setQ] = useState("");
  const [toast, setToast] = useState<string | null>(null);
  const filtered = list.filter((f) => (f.id + f.title + f.ward).toLowerCase().includes(q.toLowerCase()));

  const waive = (id: string) => {
    setList(list.map((f) => (f.id === id ? { ...f, status: "Waived" as const } : f)));
    setToast(`${id} waived.`);
    setTimeout(() => setToast(null), 2000);
  };

  return (
    <AdminShell>
      <PageHeader title="Fines" subtitle="Issue, track and waive municipal fines" action={<Input placeholder="Search…" value={q} onChange={(e) => setQ(e.target.value)} />} />
      <Card className="p-0">
        <div className="table-wrap border-0">
          <table className="data">
            <thead><tr><th>ID</th><th>Title</th><th>Amount</th><th>Due</th><th>Status</th><th>Action</th></tr></thead>
            <tbody>
              {filtered.map((f) => (
                <tr key={f.id}>
                  <td className="font-medium">{f.id}</td><td>{f.title}<br /><span className="text-xs font-normal text-mutedtext">{f.reason}</span></td>
                  <td>{formatNPR(f.amount)}</td><td>{formatDate(f.dueDate)}</td><td><StatusBadge status={f.status} /></td>
                  <td>{f.status === "Unpaid" ? <Button size="sm" variant="outline" onClick={() => waive(f.id)}>Waive</Button> : <span className="text-xs text-mutedtext">—</span>}</td>
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
