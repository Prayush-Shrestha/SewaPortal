"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, FileText, FolderOpen, CreditCard, Gavel, AlertTriangle, BarChart3, Vote } from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/users", label: "Users", icon: Users },
  { href: "/admin/applications", label: "Applications", icon: FileText },
  { href: "/admin/documents", label: "Documents", icon: FolderOpen },
  { href: "/admin/payments", label: "Payments", icon: CreditCard },
  { href: "/admin/fines", label: "Fines", icon: Gavel },
  { href: "/admin/issues", label: "Issues", icon: AlertTriangle },
  { href: "/admin/polls", label: "Polls", icon: Vote },
  { href: "/admin/reports", label: "Reports", icon: BarChart3 },
];

export default function AdminSidebar() {
  const path = usePathname();
  return (
    <aside className="w-full shrink-0 lg:w-60">
      <nav className="flex gap-1 overflow-x-auto rounded-lg border border-line bg-white p-2 lg:flex-col lg:overflow-visible">
        {items.map((it) => {
          const active = path === it.href;
          const Icon = it.icon;
          return (
            <Link
              key={it.href}
              href={it.href}
              className={cn(
                "flex shrink-0 items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors duration-150",
                active ? "bg-primary-light font-medium text-primary" : "text-stone-600 hover:bg-stone-50"
              )}
            >
              <Icon size={16} />
              {it.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
