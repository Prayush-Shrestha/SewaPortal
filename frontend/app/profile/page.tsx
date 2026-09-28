"use client";
import { useState } from "react";
import Link from "next/link";
import { AppShell } from "@/components/Shells";
import { PageHeader, Card, Button, EmptyState } from "@/components/ui";
import { useAuth } from "@/lib/auth";
import { initials } from "@/lib/utils";
import { MapPin, Calendar } from "lucide-react";

export default function ProfilePage() {
  const { user } = useAuth();
  const [tab, setTab] = useState<"Posts" | "Saved" | "Activity">("Posts");
  const first = user?.firstName ?? "Ram";
  const last = user?.lastName ?? "Sharma";

  return (
    <AppShell>
      <PageHeader title="Profile" action={<Link href="/profile/edit"><Button variant="outline">Edit profile</Button></Link>} />
      <Card className="p-5">
        <div className="flex flex-wrap items-center gap-4">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-xl font-semibold text-white">{initials(first, last)}</span>
          <div>
            <h1 className="text-lg font-semibold">{first} {last}</h1>
            <p className="text-sm text-mutedtext">@{user?.username ?? "ram.sharma"} · {user?.email ?? "ram@example.com"}</p>
            <p className="mt-1 flex flex-wrap gap-3 text-xs text-mutedtext">
              <span className="flex items-center gap-1"><MapPin size={12} /> {user?.address ?? "Pulchowk, Lalitpur-3"}</span>
              <span className="flex items-center gap-1"><Calendar size={12} /> Joined {user?.joinedAt ?? "2024-03-10"}</span>
            </p>
          </div>
          <div className="ml-auto flex gap-4 text-center text-sm">
            <div><p className="font-semibold">3</p><p className="text-xs text-mutedtext">Issues</p></div>
            <div><p className="font-semibold">5</p><p className="text-xs text-mutedtext">Applications</p></div>
            <div><p className="font-semibold">6</p><p className="text-xs text-mutedtext">Documents</p></div>
          </div>
        </div>
        <div className="mt-4 flex gap-1 border-t border-line pt-3 text-sm">
          {(["Posts", "Saved", "Activity"] as const).map((t) => (
            <button key={t} onClick={() => setTab(t)} className={`h-9 rounded-md px-4 ${tab === t ? "bg-primary-light font-medium text-primary" : "text-mutedtext hover:bg-stone-50"}`}>{t}</button>
          ))}
        </div>
        <div className="mt-3">
          {tab === "Posts" && (
            <div className="space-y-2 text-sm">
              <div className="rounded-md border border-line p-3"><p className="font-medium">Water leakage at Bakhundole — ISS-298</p><p className="text-mutedtext">Reported Sep 18 · 18 neighbours support · status Open</p></div>
              <div className="rounded-md border border-line p-3"><p className="font-medium">Voted: Saturday composting pilot</p><p className="text-mutedtext">Yes, fully support · Sep 22</p></div>
            </div>
          )}
          {tab === "Saved" && <EmptyState title="Nothing saved yet" body="Save polls or service guides to find them here." />}
          {tab === "Activity" && (
            <div className="space-y-2 text-sm">
              <div className="rounded-md bg-stone-50 p-3">Sep 24 — NID-2026-1042 moved to Processing</div>
              <div className="rounded-md bg-stone-50 p-3">Sep 18 — Paid NPR 200 via eSewa (RCP-881201)</div>
              <div className="rounded-md bg-stone-50 p-3">Sep 15 — Applied for Citizenship Certificate</div>
            </div>
          )}
        </div>
      </Card>
    </AppShell>
  );
}
