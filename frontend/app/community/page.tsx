"use client";
import { useState } from "react";
import Link from "next/link";
import { AppShell } from "@/components/Shells";
import { PageHeader, Card, StatusBadge, Button } from "@/components/ui";
import { polls, issues, announcements } from "@/lib/data";
import { formatDate } from "@/lib/utils";
import { ThumbsUp, MapPin } from "lucide-react";

export default function CommunityPage() {
  const [tab, setTab] = useState<"Polls" | "Issues" | "Announcements">("Polls");
  const [voted, setVoted] = useState<Record<string, string>>({});
  const [counts, setCounts] = useState<Record<string, number[]>>(Object.fromEntries(polls.map((p) => [p.id, p.options.map((o) => o.votes)])));

  const vote = (pollId: string, optIdx: number) => {
    if (voted[pollId]) return;
    const opts = polls.find((p) => p.id === pollId)!.options;
    setVoted({ ...voted, [pollId]: opts[optIdx].id });
    setCounts({ ...counts, [pollId]: counts[pollId].map((c, i) => (i === optIdx ? c + 1 : c)) });
  };

  return (
    <AppShell>
      <PageHeader
        title="Community"
        subtitle="Polls, ward issues and notices for Lalitpur & Kathmandu."
        action={<Link href="/community/report-issue"><Button>Report issue</Button></Link>}
      />
      <div className="mb-4 flex gap-1 rounded-lg border border-line bg-white p-1 text-sm">
        {(["Polls", "Issues", "Announcements"] as const).map((t) => (
          <button key={t} onClick={() => setTab(t)} className={`h-9 flex-1 rounded-md ${tab === t ? "bg-primary text-white" : "hover:bg-stone-50"}`}>{t}</button>
        ))}
      </div>

      {tab === "Polls" && (
        <div className="space-y-3">
          {polls.slice(0, 2).map((p) => {
            const total = counts[p.id].reduce((a, b) => a + b, 0);
            return (
              <Card key={p.id} className="p-4">
                <p className="text-xs text-mutedtext">{p.category} · closes {formatDate(p.closesAt)}</p>
                <h3 className="font-semibold">{p.question}</h3>
                <p className="text-sm text-mutedtext">{p.description}</p>
                <div className="mt-2 space-y-2">
                  {p.options.map((o, i) => {
                    const pct = Math.round((counts[p.id][i] / total) * 100);
                    const mine = voted[p.id] === o.id;
                    return (
                      <button key={o.id} onClick={() => vote(p.id, i)} className={`w-full rounded-md border p-2 text-left text-sm ${mine ? "border-primary bg-primary-light" : "border-line hover:border-primary"}`}>
                        <span className="flex justify-between"><span>{o.label}</span><span className="text-mutedtext">{pct}%</span></span>
                        <span className="mt-1 block h-1.5 overflow-hidden rounded bg-stone-100"><span className="block h-full bg-primary" style={{ width: `${pct}%` }} /></span>
                      </button>
                    );
                  })}
                </div>
                <Link href="/community/polls" className="mt-2 inline-block text-sm text-primary hover:underline">All polls →</Link>
              </Card>
            );
          })}
        </div>
      )}

      {tab === "Issues" && (
        <div className="space-y-2">
          {issues.map((iss) => (
            <Card key={iss.id} className="p-4">
              <div className="flex items-center justify-between gap-2">
                <p className="font-medium">{iss.id} · {iss.title}</p>
                <StatusBadge status={iss.status} />
              </div>
              <p className="mt-1 text-sm text-mutedtext">{iss.description}</p>
              <p className="mt-1 flex items-center gap-1 text-xs text-mutedtext"><MapPin size={12} /> {iss.location} · by {iss.reporter} · {formatDate(iss.createdAt)}</p>
              <p className="mt-1 flex items-center gap-1 text-xs text-mutedtext"><ThumbsUp size={12} /> {iss.votes} neighbours support this</p>
            </Card>
          ))}
          <Link href="/community/report-issue" className="inline-block text-sm font-medium text-primary hover:underline">Report a new issue →</Link>
        </div>
      )}

      {tab === "Announcements" && (
        <div className="space-y-2">
          {announcements.map((a) => (
            <Card key={a.id} className="p-4">
              <p className="font-medium">{a.title}</p>
              <p className="mt-1 text-sm text-mutedtext">{a.body}</p>
              <p className="mt-1 text-xs text-mutedtext">{formatDate(a.date)}</p>
            </Card>
          ))}
        </div>
      )}
    </AppShell>
  );
}
