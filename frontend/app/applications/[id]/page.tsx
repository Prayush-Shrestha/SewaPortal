"use client";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { AppShell } from "@/components/Shells";
import { Card, StatusBadge, Button } from "@/components/ui";
import StatusTracker from "@/components/StatusTracker";
import { applications } from "@/lib/data";
import { formatDate, formatNPR } from "@/lib/utils";
import { CheckCircle2, Circle } from "lucide-react";

export default function ApplicationDetailPage() {
  const params = useParams();
  const router = useRouter();
  const app = applications.find((a) => a.id === params.id) ?? applications[0];

  return (
    <AppShell>
      <button onClick={() => router.back()} className="mb-3 text-sm text-mutedtext hover:text-primary">← All applications</button>
      <Card className="p-5">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div>
            <h1 className="text-lg font-semibold">{app.id} · {app.serviceName}</h1>
            <p className="text-sm text-mutedtext">Applicant {app.applicant} · submitted {formatDate(app.submittedAt)} · updated {formatDate(app.updatedAt)}</p>
          </div>
          <StatusBadge status={app.status} />
        </div>
        <div className="mt-4"><StatusTracker status={app.status} /></div>
        <div className="mt-5 grid gap-3 md:grid-cols-2">
          <div>
            <h2 className="font-semibold">Timeline</h2>
            <ol className="mt-2 space-y-2">
              {app.timeline.map((t) => (
                <li key={t.label} className="flex items-center gap-2 text-sm">
                  {t.done ? <CheckCircle2 size={16} className="text-green-600" /> : <Circle size={16} className="text-stone-300" />}
                  <span className={t.done ? "" : "text-mutedtext"}>{t.label}</span>
                  <span className="ml-auto text-xs text-mutedtext">{t.date}</span>
                </li>
              ))}
            </ol>
          </div>
          <div>
            <h2 className="font-semibold">Fee & remarks</h2>
            <p className="mt-2 text-sm">Fee: <span className="font-semibold">{formatNPR(app.fee)}</span> · {app.paid ? "Paid" : "Unpaid"}</p>
            <p className="mt-1 rounded-md bg-stone-50 p-2 text-sm text-stone-600">{app.remarks ?? "No remarks yet."}</p>
            {!app.paid && (
              <Link href="/payments" className="mt-3 inline-flex"><Button size="sm">Pay {formatNPR(app.fee)} now</Button></Link>
            )}
          </div>
        </div>
      </Card>
    </AppShell>
  );
}
