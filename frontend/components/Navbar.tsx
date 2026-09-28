"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X, Landmark } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { cn } from "@/lib/utils";

const publicLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/community", label: "Community" },
  { href: "/about", label: "About" },
];

const userLinks = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/services", label: "Services" },
  { href: "/community", label: "Community" },
  { href: "/documents", label: "Documents" },
  { href: "/profile", label: "Profile" },
];

export default function Navbar() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={cn("sticky top-0 z-40 h-[60px] transition-colors duration-200", solid ? "border-b border-line bg-white" : "bg-transparent")}>
      <div className="mx-auto flex h-[60px] max-w-6xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-white">
            <Landmark size={18} />
          </span>
          <span className="text-[15px] font-semibold tracking-tight">
            Sewa<span className="text-primary">Portal</span>
            <span className="ml-1 hidden text-xs font-normal text-mutedtext sm:inline">Nepal</span>
          </span>
        </Link>
        <nav className="hidden items-center gap-5 text-sm md:flex">
          {(user ? userLinks : publicLinks).map((l) => (
            <Link key={l.href + l.label} href={l.href} className="text-stone-600 hover:text-primary">
              {l.label}
            </Link>
          ))}
          {user ? (
            <>
              <span className="max-w-[160px] truncate text-xs text-mutedtext">{user.email}</span>
              <button onClick={logout} className="h-9 rounded-md border border-line px-3 text-sm hover:bg-stone-50">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="text-stone-600 hover:text-primary">Login</Link>
              <Link href="/register" className="h-9 inline-flex items-center rounded-md bg-primary px-4 text-sm font-medium text-white hover:bg-primary-dark">
                Get Started
              </Link>
            </>
          )}
        </nav>
        <button className="rounded-md border border-line p-2 md:hidden" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>
      {open && (
        <div className="border-b border-line bg-white px-4 pb-4 pt-1 md:hidden">
          <div className="flex flex-col gap-1 text-sm">
            {(user ? userLinks : publicLinks).map((l) => (
              <Link key={l.href + l.label} href={l.href} onClick={() => setOpen(false)} className="rounded px-2 py-2 hover:bg-stone-50">
                {l.label}
              </Link>
            ))}
            {user ? (
              <button onClick={() => { logout(); setOpen(false); }} className="rounded border border-line px-2 py-2 text-left">Logout</button>
            ) : (
              <>
                <Link href="/login" onClick={() => setOpen(false)} className="rounded px-2 py-2 hover:bg-stone-50">Login</Link>
                <Link href="/register" onClick={() => setOpen(false)} className="rounded bg-primary px-2 py-2 text-center text-white">Get Started</Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
