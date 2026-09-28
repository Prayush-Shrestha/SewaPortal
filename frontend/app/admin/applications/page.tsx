"use client";
import { useState } from "react";
import { AdminShell } from "@/components/Shells";
import { PageHeader, Card, Input, Select, StatusBadge, Button, Pagination } from "@/components/ui";
import { applications } from "@/lib/data";
import type { Application } from "@/lib/types";
import { formatDate, formatNPR } from "@/lib/utils";

export default function AdminApplicationsPage() {
  const [list, setList] = useState<Application[]>(applications);
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("All");
  const [page, setPage] = useState(1);
  const [toast, setToast] = useState<string | null>(null);
  const perPage = 4;

  const filtered = list.filter((a) => (status === "All" || a.status === status) && (a.id + a.serviceName + a.applicant).toLowerCase().includes(q.toLowerCase()));
  const rows = filtered.slice((page - 1) * perPage, page * perPage);

  const decide = (id: string, s: Application["status"]) => {
    setList(list.map((a) => (a.id === id ? { ...a, status: s } : a)));
    setToast(`${id} marked ${s}.`);
    setTimeout(() => setToast(null), 2000);
  };

  return (
    <AdminShell>
      <PageHeader title="Applications" subtitle={`${filtered.length} requests`} />
      <div className="mb-3 grid gap-2 sm:grid-cols-[1fr_200px]">
        <Input placeholder="Search ID, service, applicant…" value={q} onChange={(e) => { setQ(e.target.value); setPage(1); }} />
        <Select value={status} onChange={(e) => { setStatus(e.target.value); setPage(1); }}>
          {["All", "Submitted", "Under Review", "Processing", "Approved", "Rejected"].map((s) => <option key={s}>{s}</option>)}
        </Select>
      </div>
      <Card className="p-0">
        <div className="table-wrap border-0">
          <table className="data">
            <thead><tr><th>ID</th><th>Service</th><th>Applicant</th><th>Fee</th><th>Status</th><th>Actions</th></tr></thead>
            <tbody>
              {rows.map((a) => (
                <tr key={a.id}>
                  <td className="font-medium">{a.id}<br /><span className="text-xs font-normal text-mutedtext">{formatDate(a.submittedAt)}</span></td>
                  <td>{a.serviceName}</td><td>{a.applicant}</td><td>{formatNPR(a.fee)}</td>
                  <td><StatusBadge status={a.status} /></td>
                  <td><div className="flex gap-1"><Button size="sm" onClick={() => decide(a.id, "Approved")}>Approve</Button><Button size="sm" variant="outline" onClick={() => decide(a.id, "Rejected")}>Reject</Button></div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4"><Pagination page={page} total={filtered.length} perPage={perPage} onPage={setPage} /></div>
      </Card>
      {toast && <div className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2 rounded-md border border-green-200 bg-green-50 px-4 py-2 text-sm text-green-800">{toast}</div>}
    </AdminShell>
  );
}
