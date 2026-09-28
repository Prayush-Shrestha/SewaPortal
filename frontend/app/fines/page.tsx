"use client";
import { useState } from "react";
import { AppShell } from "@/components/Shells";
import { PageHeader, Card, StatusBadge, Button, Modal, Select } from "@/components/ui";
import { fines } from "@/lib/data";
import type { Fine } from "@/lib/types";
import { formatNPR, formatDate } from "@/lib/utils";

export default function FinesPage() {
  const [list, setList] = useState<Fine[]>(fines);
  const [paying, setPaying] = useState<Fine | null>(null);
  const [method, setMethod] = useState("eSewa");
  const [toast, setToast] = useState<string | null>(null);

  const unpaid = list.filter((f) => f.status === "Unpaid");
  const paid = list.filter((f) => f.status !== "Unpaid");

  const confirmPay = () => {
    if (!paying) return;
    setList(list.map((f) => (f.id === paying.id ? { ...f, status: "Paid" as const } : f)));
    setPaying(null);
    setToast(`Fine ${paying.id} paid via ${method}. Receipt emailed.`);
    setTimeout(() => setToast(null), 2200);
  };

  return (
    <AppShell>
      <PageHeader title="Fines" subtitle="Municipal fines for Lalitpur & Kathmandu. Pay before the due date to avoid extra charges." />
      <div className="grid gap-3 lg:grid-cols-2">
        <div>
          <h2 className="mb-2 font-semibold">Unpaid ({unpaid.length}) · {formatNPR(unpaid.reduce((s, f) => s + f.amount, 0))}</h2>
          <div className="space-y-2">
            {unpaid.map((f) => (
              <Card key={f.id} className="border-l-4 border-l-red-500 p-4">
                <div className="flex items-center justify-between"><span className="font-semibold">{f.id} · {f.title}</span><StatusBadge status={f.status} /></div>
                <p className="mt-1 text-sm text-mutedtext">{f.reason} · {f.ward}</p>
                <p className="mt-1 text-sm">Due {formatDate(f.dueDate)} · <span className="font-semibold">{formatNPR(f.amount)}</span></p>
                <Button size="sm" className="mt-2" onClick={() => setPaying(f)}>Pay Now</Button>
              </Card>
            ))}
            {unpaid.length === 0 && <Card className="p-4 text-sm text-mutedtext">All fines cleared. Dhanyabad!</Card>}
          </div>
        </div>
        <div>
          <h2 className="mb-2 font-semibold">Paid & history ({paid.length})</h2>
          <div className="space-y-2">
            {paid.map((f) => (
              <Card key={f.id} className="p-4">
                <div className="flex items-center justify-between"><span className="font-medium">{f.id} · {f.title}</span><StatusBadge status={f.status} /></div>
                <p className="mt-1 text-sm text-mutedtext">{formatNPR(f.amount)} · issued {formatDate(f.issuedAt)}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <Modal open={!!paying} onClose={() => setPaying(null)} title={paying ? `Pay ${paying.id} — ${formatNPR(paying.amount)}` : "Pay fine"}>
        <div className="space-y-3">
          <Select label="Payment method" value={method} onChange={(e) => setMethod(e.target.value)}>
            <option>eSewa</option><option>Khalti</option><option>ConnectIPS</option><option>Bank card</option>
          </Select>
          <p className="text-xs text-mutedtext">Demo checkout — no real charge. A receipt like RCP-882xxx will be issued.</p>
          <Button className="w-full" onClick={confirmPay}>Confirm payment</Button>
        </div>
      </Modal>
      {toast && <div className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2 rounded-md border border-green-200 bg-green-50 px-4 py-2 text-sm text-green-800">{toast}</div>}
    </AppShell>
  );
}
