"use client";
import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button, Card, Input } from "@/components/ui";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.includes("@")) setSent(true);
  };
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="mx-auto max-w-md px-4 py-10">
        <Card className="p-6">
          <h1 className="text-lg font-semibold">Reset password</h1>
          <p className="mt-1 text-sm text-mutedtext">We&apos;ll email a 6-digit code valid for 15 minutes.</p>
          {sent ? (
            <div className="mt-4 rounded-md bg-green-50 p-3 text-sm text-green-800">
              Reset link sent to {email}. Check inbox and spam. <Link href="/login" className="font-medium underline">Back to login</Link>
            </div>
          ) : (
            <form onSubmit={submit} className="mt-4 space-y-3">
              <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="ram@example.com" />
              <Button className="w-full">Send reset link</Button>
            </form>
          )}
        </Card>
      </main>
      <Footer />
    </div>
  );
}
