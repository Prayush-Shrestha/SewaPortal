"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import type { User } from "./types";
import { ApiError, api } from "./api";

interface AuthCtx {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<User>;
  register: (data: Partial<User> & { password: string }) => Promise<User>;
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

interface BackendProfile {
  phone?: string;
  date_of_birth?: string | null;
  gender?: string;
  address?: string;
}

interface BackendUser {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  is_staff: boolean;
  date_joined: string;
  profile?: BackendProfile | null;
}

function mapBackendUser(u: BackendUser): User {
  return {
    id: String(u.id),
    firstName: u.first_name || "",
    lastName: u.last_name || "",
    username: u.username,
    email: u.email || "",
    phone: u.profile?.phone || "",
    address: u.profile?.address || "",
    role: u.is_staff ? "admin" : "user",
    dob: u.profile?.date_of_birth || undefined,
    gender: u.profile?.gender || "",
    joinedAt: (u.date_joined || "").slice(0, 10),
  };
}

function storeTokens(access: string, refresh?: string) {
  localStorage.setItem("csp_token", access);
  if (refresh) localStorage.setItem("csp_refresh", refresh);
  else localStorage.removeItem("csp_refresh");
}

function clearTokens() {
  localStorage.removeItem("csp_token");
  localStorage.removeItem("csp_refresh");
}

/** True when the backend could not be reached at all (offline mode). */
function isUnreachable(e: unknown): boolean {
  return e instanceof ApiError && e.status === undefined;
}

/** Real backend login. Throws on bad credentials; caller decides on fallback. */
async function tryRealLogin(identifier: string, password: string): Promise<User> {
  const tokens = await api.post<{ access: string; refresh: string }>("/auth/login/", {
    username: identifier.trim(),
    password,
  });
  storeTokens(tokens.access, tokens.refresh);
  try {
    const me = await api.get<BackendUser>("/auth/me/");
    const u = mapBackendUser(me);
    persistUser(u);
    return u;
  } catch {
    clearTokens();
    throw new ApiError("Login succeeded but loading your profile failed.");
  }
}

function persistUser(u: User | null) {
  if (typeof window !== "undefined") {
    if (u) localStorage.setItem("csp_user", JSON.stringify(u));
    else {
      localStorage.removeItem("csp_user");
      clearTokens();
    }
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      let cached: User | null = null;
      try {
        const raw = localStorage.getItem("csp_user");
        if (raw) cached = JSON.parse(raw) as User;
      } catch {}
      if (cached) setUser(cached);
      // Revalidate against the real backend when we hold a JWT (not a demo token).
      const token = localStorage.getItem("csp_token");
      if (token && !token.startsWith("demo-token-")) {
        try {
          const me = await api.get<BackendUser>("/auth/me/");
          const u = mapBackendUser(me);
          setUser(u);
          localStorage.setItem("csp_user", JSON.stringify(u));
        } catch {
          /* keep cached user (offline or expired token) */
        }
      }
      setLoading(false);
    })();
  }, []);

  const persist = (u: User | null) => {
    setUser(u);
    persistUser(u);
  };

  const login = async (email: string, password: string): Promise<User> => {
    if (!email || !password) throw new Error("Enter email and password.");
    try {
      const u = await tryRealLogin(email, password);
      setUser(u);
      return u;
    } catch (e) {
      // Wrong credentials on a reachable backend: surface the real error.
      if (!isUnreachable(e)) throw e;
    }
    // Demo fallback (backend unreachable)
    let u: User;
    if (email === "admin@portal.np" && password === "admin123") {
      u = DEMO_ADMIN;
    } else if (email === "ram@example.com") {
      u = DEMO_USER;
    } else {
      u = { ...DEMO_USER, email, firstName: email.split("@")[0] || "Ram" };
    }
    setUser(u);
    persistUser(u);
    localStorage.setItem("csp_token", "demo-token-" + u.id);
    return u;
  };

  const register = async (data: Partial<User> & { password: string }): Promise<User> => {
    if (!data.email || !data.password) throw new Error("Email and password required.");
    try {
      await api.post("/auth/register/", {
        username: data.username?.trim() || (data.email?.split("@")[0] ?? "citizen"),
        email: data.email,
        password: data.password,
        first_name: data.firstName || "",
        last_name: data.lastName || "",
        phone: data.phone || "",
        address: data.address || "",
      });
      const u = await tryRealLogin(data.email, data.password);
      setUser(u);
      return u;
    } catch (e) {
      if (!isUnreachable(e)) throw e;
    }
    // Demo fallback (backend unreachable)
    const u: User = {
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
    };
    setUser(u);
    persistUser(u);
    localStorage.setItem("csp_token", "demo-token-" + u.id);
    return u;
  };

  const logout = () => persist(null);
  const loginAsAdmin = () => {
    persist(DEMO_ADMIN);
    localStorage.setItem("csp_token", "demo-token-" + DEMO_ADMIN.id);
  };

  return <Ctx.Provider value={{ user, loading, login, register, logout, loginAsAdmin }}>{children}</Ctx.Provider>;
}

export function useAuth(): AuthCtx {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
