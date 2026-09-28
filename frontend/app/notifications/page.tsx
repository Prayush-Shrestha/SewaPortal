"use client";
import { useState } from "react";
import { AppShell } from "@/components/Shells";
import { PageHeader, Card, Button, EmptyState } from "@/components/ui";
import { notifications } from "@/lib/data";
import type { AppNotification } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import { Bell } from "lucide-react";

export default function NotificationsPage() {
  const [list, setList] = useState<AppNotification[]>(notifications);
  const [filter, setFilter] = useState("All");
  const filtered = filter === "All" ? list : filter === "Unread" ? list.filter((n) => !n.read) : list.filter((n) => n.type === filter.toLowerCase());

  const markAll = () => setList(list.map((n) => ({ ...n, read: true })));
  const markOne = (id: string) => setList(list.map((n) => (n.id === id ? { ...n, read: true } : n)));

  return (
    <AppShell>
      <PageHeader title="Notifications" subtitle={`${list.filter((n) => !n.read).length} unread`} action={<Button variant="outline" size="sm" onClick={markAll}>Mark all read</Button>} />
      <div className="mb-3 flex flex-wrap gap-1 text-sm">
        {["All", "Unread", "Application", "Payment", "Community", "System"].map((f) => (
          <button key={f} onClick={() => setFilter(f)} className={`h-8 rounded-full border px-3 ${filter === f ? "border-primary bg-primary text-white" : "border-line bg-white hover:bg-stone-50"}`}>{f}</button>
        ))}
      </div>
      {filtered.length === 0 ? (
        <EmptyState title="All caught up" body="No notifications in this view." />
      ) : (
        <div className="space-y-2">
          {filtered.map((n) => (
            <Card key={n.id} className={`flex items-start gap-3 p-4 ${n.read ? "" : "border-l-4 border-l-primary"}`}>
              <span className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-full bg-primary-light text-primary"><Bell size={15} /></span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold">{n.title} <span className="ml-1 text-xs font-normal text-mutedtext">{formatDate(n.date)}</span></p>
                <p className="text-sm text-mutedtext">{n.body}</p>
              </div>
              {!n.read && <Button size="sm" variant="outline" onClick={() => markOne(n.id)}>Mark read</Button>}
            </Card>
          ))}
        </div>
      )}
    </AppShell>
  );
}
