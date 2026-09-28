"use client";
import { useState } from "react";
import { AppShell } from "@/components/Shells";
import { PageHeader, Card } from "@/components/ui";
import { polls } from "@/lib/data";
import { formatDate } from "@/lib/utils";

export default function PollsPage() {
  const [voted, setVoted] = useState<Record<string, string>>({});
  const [counts, setCounts] = useState<Record<string, number[]>>(Object.fromEntries(polls.map((p) => [p.id, p.options.map((o) => o.votes)])));

  const vote = (pollId: string, optIdx: number) => {
    if (voted[pollId]) return;
    setVoted({ ...voted, [pollId]: polls.find((p) => p.id === pollId)!.options[optIdx].id });
    setCounts({ ...counts, [pollId]: counts[pollId].map((c, i) => (i === optIdx ? c + 1 : c)) });
  };

  return (
    <AppShell>
      <PageHeader title="Ward Polls" subtitle="3 open polls · one vote per citizen per poll. Results update live." />
      <div className="space-y-3">
        {polls.map((p) => {
          const total = counts[p.id].reduce((a, b) => a + b, 0);
          return (
            <Card key={p.id} className="p-4">
              <p className="text-xs text-mutedtext">{p.category} · {total} votes · closes {formatDate(p.closesAt)}</p>
              <h2 className="font-semibold">{p.question}</h2>
              <p className="text-sm text-mutedtext">{p.description}</p>
              <div className="mt-2 space-y-2">
                {p.options.map((o, i) => {
                  const pct = Math.round((counts[p.id][i] / total) * 100);
                  const mine = voted[p.id] === o.id;
                  return (
                    <button key={o.id} onClick={() => vote(p.id, i)} className={`w-full rounded-md border p-2.5 text-left text-sm transition-colors duration-150 ${mine ? "border-primary bg-primary-light" : "border-line hover:border-primary"}`}>
                      <span className="flex justify-between font-medium"><span>{o.label} {mine && "✓"}</span><span>{pct}% · {counts[p.id][i]}</span></span>
                      <span className="mt-1.5 block h-1.5 overflow-hidden rounded bg-stone-100"><span className="block h-full bg-primary" style={{ width: `${pct}%` }} /></span>
                    </button>
                  );
                })}
              </div>
              {voted[p.id] && <p className="mt-2 text-xs text-green-700">Vote recorded. Dhanyabad for participating!</p>}
            </Card>
          );
        })}
      </div>
    </AppShell>
  );
}
