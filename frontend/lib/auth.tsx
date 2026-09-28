"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import type { User } from "./types";
import { api } from "./api";

interface AuthCtx {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: Partial<User> & { password: string }) => Promise<void>;
  logout: () => void;
  loginAsAdmin: () => void;
}

const Ctx = createContext<AuthCtx | null>(null);

const DEMO_USER: User = {
  id: "u-1",
  firstName: "Ram",
  lastName: "Sharma",
  username: "ram.sharma",
  email: "ram@example.com",
  phone: "98510-12345",
  address: "Pulchowk, Lalitpur-3",
  role: "user",
  dob: "1992-04-12",
  gender: "Male",
  joinedAt: "2024-03-10",
};

const DEMO_ADMIN: User = {
  id: "admin-1",
  firstName: "Admin",
  lastName: "Officer",
  username: "admin",
  email: "admin@portal.np",
  phone: "01-5525001",
  address: "Pulchowk, Lalitpur",
  role: "admin",
  joinedAt: "2023-01-01",
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("csp_user");
      if (raw) setUser(JSON.parse(raw));
    } catch {}
    setLoading(false);
  }, []);

  const persist = (u: User | null) => {
    setUser(u);
    if (typeof window !== "undefined") {
      if (u) {
        localStorage.setItem("csp_user", JSON.stringify(u));
        localStorage.setItem("csp_token", "demo-token-" + u.id);
      } else {
        localStorage.removeItem("csp_user");
        localStorage.removeItem("csp_token");
      }
    }
  };

  const login = async (email: string, password: string) => {
    // Try real API first
    try {
      const res = await api.post<{ user: User; token: string }>("/auth/login", { email, password });
      persist(res.user);
      localStorage.setItem("csp_token", res.token);
      return;
    } catch {}
    // Demo fallback
    if (email === "admin@portal.np" && password === "admin123") {
      persist(DEMO_ADMIN);
      return;
    }
    if (!email || !password) throw new Error("Enter email and password.");
    if (email === "ram@example.com") {
      persist(DEMO_USER);
      return;
    }
    // Accept any registered demo user
    persist({ ...DEMO_USER, email, firstName: email.split("@")[0] || "Ram" });
  };

  const register = async (data: Partial<User> & { password: string }) => {
    try {
      const res = await api.post<{ user: User; token: string }>("/auth/register", data);
      persist(res.user);
      localStorage.setItem("csp_token", res.token);
      return;
    } catch {}
    if (!data.email || !data.password) throw new Error("Email and password required.");
    persist({
      ...DEMO_USER,
      id: "u-" + Date.now(),
      firstName: data.firstName || "New",
      lastName: data.lastName || "Citizen",
      username: data.username || (data.email?.split("@")[0] ?? "citizen"),
      email: data.email,
      phone: data.phone || "",
      address: "Kathmandu",
      role: "user",
      joinedAt: new Date().toISOString().slice(0, 10),
    });
  };

  const logout = () => persist(null);
  const loginAsAdmin = () => persist(DEMO_ADMIN);

  return <Ctx.Provider value={{ user, loading, login, register, logout, loginAsAdmin }}>{children}</Ctx.Provider>;
}

export function useAuth(): AuthCtx {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
