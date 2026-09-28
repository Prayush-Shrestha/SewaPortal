"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Briefcase, FileText, FolderOpen, CreditCard, Gavel, Users, Bell, User } from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/services", label: "Services", icon: Briefcase },
  { href: "/applications", label: "Applications", icon: FileText },
  { href: "/documents", label: "Documents", icon: FolderOpen },
  { href: "/payments", label: "Payments", icon: CreditCard },
  { href: "/fines", label: "Fines", icon: Gavel },
  { href: "/community", label: "Community", icon: Users },
  { href: "/notifications", label: "Notifications", icon: Bell },
  { href: "/profile", label: "Profile", icon: User },
];

export default function Sidebar() {
  const path = usePathname();
  return (
    <aside className="w-full shrink-0 lg:w-60">
      <nav className="flex gap-1 overflow-x-auto rounded-lg border border-line bg-white p-2 lg:flex-col lg:overflow-visible">
        {items.map((it) => {
          const active = path === it.href || (it.href !== "/dashboard" && path.startsWith(it.href));
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
