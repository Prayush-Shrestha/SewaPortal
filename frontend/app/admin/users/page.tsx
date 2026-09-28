"use client";
import { useState } from "react";
import { AdminShell } from "@/components/Shells";
import { PageHeader, Card, Input, StatusBadge, Pagination } from "@/components/ui";

const users = [
  { id: "u-1", name: "Ram Sharma", email: "ram@example.com", phone: "98510-12345", ward: "Lalitpur-3", apps: 3, joined: "2024-03-10", status: "Active" },
  { id: "u-2", name: "Sita Thapa", email: "sita@example.com", phone: "98410-56789", ward: "Kathmandu-16", apps: 2, joined: "2024-05-22", status: "Active" },
  { id: "u-3", name: "Gita Karki", email: "gita@example.com", phone: "98610-11223", ward: "Bhaktapur-4", apps: 4, joined: "2023-11-02", status: "Active" },
  { id: "u-4", name: "Hari Adhikari", email: "hari@example.com", phone: "98510-99887", ward: "Kathmandu-22", apps: 1, joined: "2025-01-15", status: "Pending" },
  { id: "u-5", name: "Mina Gurung", email: "mina@example.com", phone: "98410-33445", ward: "Lalitpur-14", apps: 2, joined: "2025-06-30", status: "Suspended" },
  { id: "u-6", name: "Bikash Rai", email: "bikash@example.com", phone: "98110-77665", ward: "Kathmandu-10", apps: 0, joined: "2026-09-01", status: "Active" },
];

export default function AdminUsersPage() {
  const [q, setQ] = useState("");
  const [page, setPage] = useState(1);
  const perPage = 5;
  const filtered = users.filter((u) => (u.name + u.email + u.ward).toLowerCase().includes(q.toLowerCase()));
  const rows = filtered.slice((page - 1) * perPage, page * perPage);

  return (
    <AdminShell>
      <PageHeader title="Users" subtitle={`${filtered.length} citizens`} action={<Input placeholder="Search name, email, ward…" value={q} onChange={(e) => { setQ(e.target.value); setPage(1); }} />} />
      <Card className="p-0">
        <div className="table-wrap border-0">
          <table className="data">
            <thead><tr><th>Name</th><th>Contact</th><th>Ward</th><th>Apps</th><th>Status</th></tr></thead>
            <tbody>
              {rows.map((u) => (
                <tr key={u.id}><td className="font-medium">{u.name}<br /><span className="text-xs font-normal text-mutedtext">{u.email}</span></td><td>{u.phone}</td><td>{u.ward}</td><td>{u.apps}</td><td><StatusBadge status={u.status === "Active" ? "Approved" : u.status === "Pending" ? "Pending" : "Rejected"} /></td></tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4"><Pagination page={page} total={filtered.length} perPage={perPage} onPage={setPage} /></div>
      </Card>
    </AdminShell>
  );
}
