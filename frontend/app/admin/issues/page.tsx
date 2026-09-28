"use client";
import { useState } from "react";
import { AdminShell } from "@/components/Shells";
import { PageHeader, Card, Input, Select, StatusBadge, Button, Pagination } from "@/components/ui";
import { issues } from "@/lib/data";
import type { Issue } from "@/lib/types";
import { formatDate } from "@/lib/utils";

export default function AdminIssuesPage() {
  const [list, setList] = useState<Issue[]>(issues);
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("All");
  const [page, setPage] = useState(1);
  const [toast, setToast] = useState<string | null>(null);
  const perPage = 5;
  const filtered = list.filter((i) => (status === "All" || i.status === status) && (i.id + i.title + i.location).toLowerCase().includes(q.toLowerCase()));
  const rows = filtered.slice((page - 1) * perPage, page * perPage);

  const setStatusFor = (id: string, s: Issue["status"]) => {
    setList(list.map((i) => (i.id === id ? { ...i, status: s } : i)));
    setToast(`${id} → ${s}.`);
    setTimeout(() => setToast(null), 2000);
  };

  return (
    <AdminShell>
      <PageHeader title="Issues" subtitle={`${filtered.length} reports from citizens`} />
      <div className="mb-3 grid gap-2 sm:grid-cols-[1fr_200px]">
        <Input placeholder="Search…" value={q} onChange={(e) => { setQ(e.target.value); setPage(1); }} />
        <Select value={status} onChange={(e) => { setStatus(e.target.value); setPage(1); }}>
          {["All", "Open", "In Progress", "Resolved"].map((s) => <option key={s}>{s}</option>)}
        </Select>
      </div>
      <Card className="p-0">
        <div className="table-wrap border-0">
          <table className="data">
            <thead><tr><th>ID</th><th>Title</th><th>Location</th><th>Status</th><th>Actions</th></tr></thead>
            <tbody>
              {rows.map((i) => (
                <tr key={i.id}>
                  <td className="font-medium">{i.id}<br /><span className="text-xs font-normal text-mutedtext">{formatDate(i.createdAt)}</span></td>
                  <td>{i.title}<br /><span className="text-xs text-mutedtext">{i.category} · {i.votes} votes</span></td>
                  <td>{i.location}</td><td><StatusBadge status={i.status} /></td>
                  <td><div className="flex gap-1"><Button size="sm" variant="outline" onClick={() => setStatusFor(i.id, "In Progress")}>Progress</Button><Button size="sm" onClick={() => setStatusFor(i.id, "Resolved")}>Resolve</Button></div></td>
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
