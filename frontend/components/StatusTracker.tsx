"use client";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

const STEPS = ["Submitted", "Under Review", "Processing", "Approved"];

export default function StatusTracker({ status, compact = false }: { status: string; compact?: boolean }) {
  const idx = status === "Rejected" ? -1 : STEPS.indexOf(status);
  if (status === "Rejected") {
    return (
      <div className="flex items-center gap-2 text-sm">
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-white text-xs">!</span>
        <span className="font-medium text-red-700">Rejected — see remarks</span>
      </div>
    );
  }
  return (
    <ol className={cn("flex items-center", compact ? "gap-1" : "gap-0")}>
      {STEPS.map((s, i) => {
        const done = i <= idx;
        const current = i === idx;
        return (
          <li key={s} className="flex items-center">
            <div className="flex items-center gap-1.5">
              <span
                className={cn(
                  "flex h-5 w-5 items-center justify-center rounded-full border text-[11px]",
                  done ? "border-primary bg-primary text-white" : "border-line bg-white text-mutedtext"
                )}
              >
                {done ? <Check size={12} /> : i + 1}
              </span>
              {!compact && (
                <span className={cn("text-xs", current ? "font-semibold text-primary" : done ? "text-ink" : "text-mutedtext")}>
                  {s}
                </span>
              )}
            </div>
            {i < STEPS.length - 1 && <span className={cn("mx-1.5 h-px", compact ? "w-4" : "w-6 sm:w-10", i < idx ? "bg-primary" : "bg-line")} />}
          </li>
        );
      })}
    </ol>
  );
}
