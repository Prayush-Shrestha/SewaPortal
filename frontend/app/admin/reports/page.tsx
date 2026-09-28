"use client";
import { AdminShell } from "@/components/Shells";
import { PageHeader, Card, Stat } from "@/components/ui";
import { MonthlyBars, PaymentBars } from "@/components/Charts";
import { monthlyApplications } from "@/lib/data";
import { Button } from "@/components/ui";

export default function AdminReportsPage() {
  const exportCsv = (name: string) => {
    const csv = "id,service,applicant,status\nNID-2026-1042,National ID,Ram Sharma,Processing\nDL-2026-1038,Driving License,Ram Sharma,Pending\n";
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = name;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <AdminShell>
      <PageHeader title="Reports" subtitle="Monthly summaries for municipal meetings" action={<Button variant="outline" onClick={() => exportCsv("applications-sep-2026.csv")}>Export CSV</Button>} />
      <div className="grid gap-3 sm:grid-cols-3">
        <Stat label="Approval rate" value="84%" sub="148 / 176 decided" />
        <Stat label="Avg. processing" value="6.2 days" sub="Target: 7 days" />
        <Stat label="Collection rate" value="91%" sub="Fines + tax" />
      </div>
      <div className="mt-3 grid gap-3 lg:grid-cols-2">
        <Card className="p-4"><h2 className="font-semibold">Applications trend</h2><MonthlyBars data={monthlyApplications} /></Card>
        <Card className="p-4"><h2 className="font-semibold">Revenue trend (NPR 000s)</h2><PaymentBars data={[{ month: "Jun", amount: 182 }, { month: "Jul", amount: 201 }, { month: "Aug", amount: 196 }, { month: "Sep", amount: 214 }]} /></Card>
      </div>
      <Card className="mt-3 p-4 text-sm text-mutedtext">
        Ward 10 summary: 81 applications in September (up 23% vs August). Top service: National ID (24). 3 issues resolved, 9 reported. Poll participation 761 votes across 2 polls. Prepared by Admin Officer - Sep 28, 2026.
      </Card>
    </AdminShell>
  );
}
