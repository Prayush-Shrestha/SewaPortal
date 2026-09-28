export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}

export function formatNPR(amount: number): string {
  return "NPR " + amount.toLocaleString("en-NP");
}

export function formatDate(iso: string): string {
  try {
    const d = new Date(iso);
    return d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
  } catch {
    return iso;
  }
}

export function statusColor(status: string): string {
  const s = status.toLowerCase();
  if (s.includes("approv") || s === "paid" || s === "resolved" || s === "verified")
    return "bg-green-50 text-green-700 border-green-200";
  if (s.includes("review") || s === "pending" || s === "processing" || s === "in progress" || s === "submitted" || s === "reported")
    return "bg-amber-50 text-amber-700 border-amber-200";
  if (s.includes("reject") || s === "failed" || s === "unpaid" || s === "requires action")
    return "bg-red-50 text-red-700 border-red-200";
  if (s === "waived") return "bg-stone-100 text-stone-600 border-stone-200";
  return "bg-orange-50 text-primary border-orange-200";
}

export function initials(first: string, last: string): string {
  return ((first?.[0] ?? "") + (last?.[0] ?? "")).toUpperCase() || "U";
}

export function maskDocNumber(num: string): string {
  if (!num || num.length < 6) return "••••" + num;
  return "•••• •••• " + num.slice(-4);
}
