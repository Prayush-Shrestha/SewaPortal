"use client";
import { useState } from "react";
import { AdminShell } from "@/components/Shells";
import { PageHeader, Card, Input, StatusBadge } from "@/components/ui";
import { payments } from "@/lib/data";
import { formatNPR, formatDate } from "@/lib/utils";

export default function AdminPaymentsPage() {
  const [q, setQ] = useState("");
  const filtered = payments.filter((p) => (p.title + p.receiptNo + p.method).toLowerCase().includes(q.toLowerCase()));
  return (
    <AdminShell>
      <PageHeader title="Payments" subtitle={`${formatNPR(filtered.filter((p) => p.status === "Paid").reduce((s, p) => s + p.amount, 0))} collected (filtered)`} action={<Input placeholder="Search…" value={q} onChange={(e) => setQ(e.target.value)} />} />
      <Card className="p-0">
        <div className="table-wrap border-0">
          <table className="data">
            <thead><tr><th>Title</th><th>Amount</th><th>Date</th><th>Method</th><th>Status</th><th>Receipt</th></tr></thead>
            <tbody>
              {filtered.map((p) => (
                <tr key={p.id}><td>{p.title}</td><td className="font-medium">{formatNPR(p.amount)}</td><td>{formatDate(p.date)}</td><td>{p.method}</td><td><StatusBadge status={p.status} /></td><td className="text-xs">{p.receiptNo}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </AdminShell>
  );
}
