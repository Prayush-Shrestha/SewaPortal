"use client";
import { useState } from "react";
import { AdminShell } from "@/components/Shells";
import { PageHeader, Card, Input, Button, Modal, Textarea } from "@/components/ui";
import { polls } from "@/lib/data";
import { formatDate } from "@/lib/utils";

export default function AdminPollsPage() {
  const [open, setOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [toast, setToast] = useState<string | null>(null);

  const create = (e: React.FormEvent) => {
    e.preventDefault();
    if (question.length < 10) return;
    setOpen(false);
    setQuestion("");
    setToast("Poll created and published to Ward 10.");
    setTimeout(() => setToast(null), 2200);
  };

  return (
    <AdminShell>
      <PageHeader title="Polls" subtitle="Create and close ward polls" action={<Button onClick={() => setOpen(true)}>New poll</Button>} />
      <div className="space-y-2">
        {polls.map((p) => (
          <Card key={p.id} className="flex flex-wrap items-center justify-between gap-2 p-4">
            <div>
              <p className="font-medium">{p.question}</p>
              <p className="text-xs text-mutedtext">{p.category} · {p.totalVotes} votes · closes {formatDate(p.closesAt)}</p>
            </div>
            <div className="flex gap-1">
              <Button size="sm" variant="outline" onClick={() => { setToast(`${p.id} closed. Results archived.`); setTimeout(() => setToast(null), 2000); }}>Close</Button>
              <Button size="sm" variant="danger" onClick={() => { setToast(`${p.id} deleted.`); setTimeout(() => setToast(null), 2000); }}>Delete</Button>
            </div>
          </Card>
        ))}
      </div>
      <Modal open={open} onClose={() => setOpen(false)} title="New poll">
        <form onSubmit={create} className="space-y-3">
          <Textarea label="Question" value={question} onChange={(e) => setQuestion(e.target.value)} placeholder="e.g. Should we extend library hours on Saturdays?" />
          <Input label="Options (comma separated)" placeholder="Yes, No, Need details" />
          <Input label="Closes on" type="date" />
          <Button className="w-full">Publish poll</Button>
        </form>
      </Modal>
      {toast && <div className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2 rounded-md border border-green-200 bg-green-50 px-4 py-2 text-sm text-green-800">{toast}</div>}
    </AdminShell>
  );
}
