"use client";
import Link from "next/link";
import { AdminShell } from "@/components/Shells";
import { PageHeader, Card, Stat, StatusBadge } from "@/components/ui";
import { StatusDonut, MonthlyBars, IssueBars, PaymentBars } from "@/components/Charts";
import { applications, monthlyApplications, statusBreakdown, payments } from "@/lib/data";
import { formatNPR } from "@/lib/utils";

export default function AdminOverviewPage() {
  return (
    <AdminShell>
      <PageHeader title="Overview" subtitle="Municipal operations at a glance · Sep 2026" />
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <Stat label="Total users" value="1,284" sub="+38 this month" />
        <Stat label="Applications" value="265" sub="42 processing" />
        <Stat label="Revenue (Sep)" value={formatNPR(214500)} sub="Tax + fees + fines" />
        <Stat label="Pending verification" value="17" sub="Documents + citizenship" />
        <Stat label="Open issues" value="9" sub="3 in progress" />
        <Stat label="Active polls" value="3" sub="861 total votes" />
      </div>
      <div className="mt-3 grid gap-3 lg:grid-cols-2">
        <Card className="p-4">
          <h2 className="font-semibold">Application status</h2>
          <StatusDonut data={statusBreakdown} />
          <div className="flex flex-wrap gap-2 text-xs">
            {statusBreakdown.map((s) => <span key={s.name} className="rounded bg-stone-100 px-2 py-0.5">{s.name}: {s.value}</span>)}
          </div>
        </Card>
        <Card className="p-4">
          <h2 className="font-semibold">Applications per month</h2>
          <MonthlyBars data={monthlyApplications} />
        </Card>
        <Card className="p-4">
          <h2 className="font-semibold">Issues by category</h2>
          <IssueBars data={[{ name: "Sanitation", value: 14 }, { name: "Water", value: 9 }, { name: "Road", value: 7 }, { name: "Electricity", value: 5 }]} />
        </Card>
        <Card className="p-4">
          <h2 className="font-semibold">Payments collected</h2>
          <PaymentBars data={[{ month: "Jun", amount: 182000 }, { month: "Jul", amount: 201000 }, { month: "Aug", amount: 196500 }, { month: "Sep", amount: 214500 }]} />
        </Card>
      </div>
      <Card className="mt-3 p-0">
        <div className="flex items-center justify-between border-b border-line p-4">
          <h2 className="font-semibold">Recent applications</h2>
          <Link href="/admin/applications" className="text-sm text-primary hover:underline">Manage →</Link>
        </div>
        <div className="table-wrap border-0">
          <table className="data">
            <thead><tr><th>ID</th><th>Service</th><th>Applicant</th><th>Status</th></tr></thead>
            <tbody>
              {applications.slice(0, 4).map((a) => (
                <tr key={a.id}><td className="font-medium">{a.id}</td><td>{a.serviceName}</td><td>{a.applicant}</td><td><StatusBadge status={a.status} /></td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
      <Card className="mt-3 p-0">
        <div className="flex items-center justify-between border-b border-line p-4">
          <h2 className="font-semibold">Recent payments</h2>
          <Link href="/admin/payments" className="text-sm text-primary hover:underline">View →</Link>
        </div>
        <div className="table-wrap border-0">
          <table className="data">
            <thead><tr><th>Title</th><th>Amount</th><th>Method</th><th>Status</th></tr></thead>
            <tbody>
              {payments.slice(0, 3).map((p) => (
                <tr key={p.id}><td>{p.title}</td><td>{formatNPR(p.amount)}</td><td>{p.method}</td><td><StatusBadge status={p.status} /></td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </AdminShell>
  );
}
