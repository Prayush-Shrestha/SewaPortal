"use client";
import { AppShell } from "@/components/Shells";
import { PageHeader, Card, StatusBadge, Stat } from "@/components/ui";
import { payments } from "@/lib/data";
import { formatNPR, formatDate } from "@/lib/utils";
import { Receipt } from "lucide-react";

export default function PaymentsPage() {
  const paid = payments.filter((p) => p.status === "Paid");
  const total = paid.reduce((s, p) => s + p.amount, 0);
  const pending = payments.filter((p) => p.status === "Pending");

  return (
    <AppShell>
      <PageHeader title="Payments" subtitle="eSewa / Khalti / ConnectIPS receipts with reference numbers." />
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="Total paid" value={formatNPR(total)} sub={`${paid.length} transactions`} />
        <Stat label="Pending" value={formatNPR(pending.reduce((s, p) => s + p.amount, 0))} sub="Building permit fee" />
        <Stat label="This month" value={formatNPR(700)} sub="Sep 2026" />
        <Stat label="Receipts" value={String(paid.length)} sub="Downloadable PDF" />
      </div>
      <Card className="mt-3 p-0">
        <div className="border-b border-line p-4 font-semibold">Transactions</div>
        <div className="table-wrap border-0">
          <table className="data">
            <thead><tr><th>Title</th><th>Amount</th><th>Date</th><th>Method</th><th>Status</th><th>Receipt</th></tr></thead>
            <tbody>
              {payments.map((p) => (
                <tr key={p.id}>
                  <td>{p.title}</td>
                  <td className="font-medium">{formatNPR(p.amount)}</td>
                  <td>{formatDate(p.date)}</td>
                  <td>{p.method}</td>
                  <td><StatusBadge status={p.status} /></td>
                  <td>{p.receiptNo === "—" ? <span className="text-xs text-mutedtext">—</span> : <span className="inline-flex items-center gap-1 text-xs text-primary"><Receipt size={13} /> {p.receiptNo}</span>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </AppShell>
  );
}
