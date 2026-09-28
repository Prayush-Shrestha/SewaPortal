"use client";
import Link from "next/link";
import { AppShell } from "@/components/Shells";
import { Card, StatusBadge, PageHeader, Button } from "@/components/ui";
import StatusTracker from "@/components/StatusTracker";
import { applications, payments, fines, notifications, polls } from "@/lib/data";
import { formatNPR, formatDate } from "@/lib/utils";
import { useAuth } from "@/lib/auth";
import { FileText, FolderOpen, CreditCard, Megaphone } from "lucide-react";

export default function DashboardPage() {
  const { user } = useAuth();
  const name = user ? `${user.firstName} ${user.lastName}` : "Ram Sharma";
  const recent = applications.slice(0, 3);
  const pending = payments.filter((p) => p.status === "Pending");
  const unread = notifications.filter((n) => !n.read).slice(0, 4);

  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";
  return (
    <AppShell>
      <PageHeader title={`${greeting}, ${name}`} subtitle="Here's what's happening with your services." />
      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { icon: FileText, label: "Apply for Service", href: "/services" },
          { icon: FolderOpen, label: "Upload Document", href: "/documents" },
          { icon: Megaphone, label: "Report an Issue", href: "/community/report-issue" },
          { icon: CreditCard, label: "Make Payment", href: "/payments" },
        ].map((a) => (
          <Link key={a.label} href={a.href} className="flex items-center gap-2 rounded-lg border border-line bg-white p-3 text-sm font-medium shadow-sm hover:border-primary hover:text-primary">
            <a.icon size={17} className="text-primary" /> {a.label}
          </Link>
        ))}
      </div>

      <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Active Applications", value: "3", sub: "2 in progress" },
          { label: "Pending", value: "1", sub: "awaiting review" },
          { label: "Completed", value: "1", sub: "approved" },
          { label: "Requires Action", value: "1", sub: "photo re-upload" },
        ].map((s) => (
          <Card key={s.label} className="p-4">
            <p className="text-xs uppercase tracking-wide text-mutedtext">{s.label}</p>
            <p className="mt-1 text-xl font-semibold">{s.value}</p>
            <p className="text-xs text-mutedtext">{s.sub}</p>
          </Card>
        ))}
      </div>

      <div className="mt-3 grid gap-3 lg:grid-cols-3">
        <Card className="p-4 lg:col-span-2">
          <div className="mb-2 flex items-center justify-between">
            <h2 className="font-semibold">Recent applications</h2>
            <Link href="/applications" className="text-sm text-primary hover:underline">View all</Link>
          </div>
          <div className="table-wrap">
            <table className="data">
              <thead><tr><th>Service</th><th>Application ID</th><th>Submitted</th><th>Status</th><th>Action</th></tr></thead>
              <tbody>
                {recent.map((a) => (
                  <tr key={a.id}>
                    <td>{a.serviceName}</td>
                    <td className="font-medium">{a.id}</td>
                    <td className="text-xs text-mutedtext">{formatDate(a.submittedAt)}</td>
                    <td><StatusBadge status={a.status} /></td>
                    <td><Link href={`/applications/${a.id}`} className="text-sm font-medium text-primary hover:underline">View</Link></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
        <div className="space-y-3">
          <Card className="p-4">
            <h2 className="font-semibold">Upcoming payments</h2>
            <div className="mt-2 space-y-2 text-sm">
              {pending.length === 0 && <p className="text-mutedtext">All clear — no pending payments.</p>}
              {pending.map((p) => (
                <div key={p.id} className="flex items-center justify-between rounded-md border border-line p-2">
                  <div><p className="font-medium">{p.title}</p><p className="text-xs text-mutedtext">{formatNPR(p.amount)}</p></div>
                  <Link href="/payments"><Button size="sm">Pay</Button></Link>
                </div>
              ))}
              {fines.filter((f) => f.status === "Unpaid").map((f) => (
                <div key={f.id} className="flex items-center justify-between rounded-md border border-line p-2">
                  <div><p className="font-medium">{f.title} · {f.id}</p><p className="text-xs text-mutedtext">{formatNPR(f.amount)} · due {formatDate(f.dueDate)}</p></div>
                  <Link href="/fines"><Button size="sm">Pay</Button></Link>
                </div>
              ))}
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center justify-between"><h2 className="font-semibold">Notifications</h2><Link href="/notifications" className="text-sm text-primary hover:underline">All</Link></div>
            <ul className="mt-2 space-y-2 text-sm">
              {unread.map((n) => (
                <li key={n.id} className="rounded-md bg-stone-50 p-2"><p className="font-medium">{n.title}</p><p className="text-xs text-mutedtext">{n.body}</p></li>
              ))}
            </ul>
          </Card>
          <Card className="p-4">
            <h2 className="font-semibold">Community mini</h2>
            <p className="mt-1 text-sm text-mutedtext">{polls[0].question}</p>
            <p className="text-xs text-mutedtext">{polls[0].totalVotes} votes · closes {formatDate(polls[0].closesAt)}</p>
            <Link href="/community/polls" className="mt-2 inline-block text-sm font-medium text-primary hover:underline">Vote now →</Link>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
