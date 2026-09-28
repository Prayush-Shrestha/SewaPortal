"use client";
import { useState } from "react";
import Link from "next/link";
import { AppShell } from "@/components/Shells";
import { PageHeader, Card, StatusBadge, Select, EmptyState } from "@/components/ui";
import StatusTracker from "@/components/StatusTracker";
import { applications } from "@/lib/data";
import { formatDate, formatNPR } from "@/lib/utils";

export default function ApplicationsPage() {
  const [status, setStatus] = useState("All");
  const filtered = status === "All" ? applications : applications.filter((a) => a.status === status);

  return (
    <AppShell>
      <PageHeader
        title="My Applications"
        subtitle="5 requests · IDs like NID-2026-1042. Click an ID for timeline."
        action={
          <Select value={status} onChange={(e) => setStatus(e.target.value)} aria-label="Filter status">
            {["All", "Submitted", "Under Review", "Processing", "Approved", "Rejected"].map((s) => <option key={s}>{s}</option>)}
          </Select>
        }
      />
      {filtered.length === 0 ? (
        <EmptyState title="No applications with this status" body="Try a different filter or apply for a new service." action={<Link href="/services" className="inline-flex h-10 items-center rounded-md bg-primary px-4 text-sm text-white">Browse services</Link>} />
      ) : (
        <div className="space-y-3">
          {filtered.map((a) => (
            <Card key={a.id} className="p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <Link href={`/applications/${a.id}`} className="font-semibold text-primary hover:underline">{a.id}</Link>
                  <p className="text-sm">{a.serviceName} · {formatDate(a.submittedAt)} · {formatNPR(a.fee)} {a.paid ? "· Paid" : "· Unpaid"}</p>
                </div>
                <StatusBadge status={a.status} />
              </div>
              <div className="mt-3"><StatusTracker status={a.status} /></div>
              {a.remarks && <p className="mt-2 rounded-md bg-stone-50 p-2 text-xs text-mutedtext">Remark: {a.remarks}</p>}
            </Card>
          ))}
        </div>
      )}
    </AppShell>
  );
}
