"use client";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button, Card, StatusBadge } from "@/components/ui";
import { services } from "@/lib/data";
import { formatNPR } from "@/lib/utils";
import { FileCheck, Clock, ShieldCheck, Megaphone, ArrowRight, CheckCircle2 } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <section className="border-b border-line bg-white">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 md:grid-cols-2 md:py-14">
          <div>
            <span className="inline-flex items-center rounded-full border border-orange-200 bg-primary-light px-2.5 py-1 text-xs font-medium text-primary">
              Kathmandu, Lalitpur and Bhaktapur wards online
            </span>
            <h1 className="mt-3 text-3xl font-semibold leading-tight tracking-tight md:text-4xl">
              Your Community Services, All in One Place
            </h1>
            <p className="mt-3 text-[15px] leading-relaxed text-mutedtext">
              Access important services, manage documents, track applications and stay connected with your community.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <Link href="/register"><Button>Get Started <ArrowRight size={15} /></Button></Link>
              <Link href="/services"><Button variant="outline">Explore Services</Button></Link>
            </div>
            <div className="mt-5 flex flex-wrap gap-4 text-sm text-mutedtext">
              <span className="flex items-center gap-1.5"><CheckCircle2 size={15} className="text-green-600" /> 265+ applications this month</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 size={15} className="text-green-600" /> eSewa / Khalti receipts</span>
            </div>
          </div>
          <div className="rounded-lg border border-line bg-page p-4 shadow-sm">
            <div className="rounded-lg border border-line bg-white p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-mutedtext">Namaste,</p>
                  <p className="font-semibold">Ram Sharma</p>
                </div>
                <StatusBadge status="Processing" />
              </div>
              <div className="mt-3 rounded-md bg-primary-light p-3 text-sm">
                <p className="font-medium">NID-2026-1042 - National ID</p>
                <p className="text-xs text-mutedtext">Submitted Sep 18, Kathmandu</p>
                <div className="mt-2 flex items-center gap-1">
                  {["Submitted", "Review", "Processing"].map((s) => (
                    <span key={s} className="rounded-full bg-primary px-2 py-0.5 text-[11px] text-white">{s}</span>
                  ))}
                  <span className="rounded-full border border-line bg-white px-2 py-0.5 text-[11px] text-mutedtext">Approved</span>
                </div>
              </div>
              <div className="mt-3 grid grid-cols-3 gap-2 text-center text-xs">
                <div className="rounded-md border border-line p-2"><p className="font-semibold">5</p><p className="text-mutedtext">Applications</p></div>
                <div className="rounded-md border border-line p-2"><p className="font-semibold">6</p><p className="text-mutedtext">Documents</p></div>
                <div className="rounded-md border border-line p-2"><p className="font-semibold">NPR 1,500</p><p className="text-mutedtext">Fines due</p></div>
              </div>
              <div className="mt-3 flex gap-2">
                <span className="h-9 flex-1 inline-flex items-center justify-center rounded-md bg-primary text-sm text-white">Track application</span>
                <span className="h-9 flex-1 inline-flex items-center justify-center rounded-md border border-line text-sm">Pay now</span>
              </div>
            </div>
            <p className="mt-2 text-center text-xs text-mutedtext">Live preview of your dashboard. Works on mobile.</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10">
        <div className="mb-4 flex items-end justify-between">
          <div>
            <h2 className="text-xl font-semibold tracking-tight">Popular services</h2>
            <p className="text-sm text-mutedtext">National ID, Driving License, PAN, Voter Card and Bluebook.</p>
          </div>
          <Link href="/services" className="text-sm font-medium text-primary hover:underline">View all</Link>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <Card key={s.slug} className="p-4">
              <div className="flex items-center justify-between">
                <span className="rounded bg-stone-100 px-2 py-0.5 text-xs text-stone-600">{s.category}</span>
                <span className="text-sm font-semibold text-primary">{formatNPR(s.fee)}</span>
              </div>
              <h3 className="mt-2 font-semibold">{s.name}</h3>
              <p className="mt-1 line-clamp-2 text-sm text-mutedtext">{s.description}</p>
              <p className="mt-2 flex items-center gap-1 text-xs text-mutedtext"><Clock size={13} /> {s.processingTime} - {s.office}</p>
              <Link href={`/services/${s.slug}`} className="mt-3 inline-flex h-9 items-center rounded-md border border-line px-3 text-sm hover:bg-stone-50">
                View and apply
              </Link>
            </Card>
          ))}
          <Card className="flex flex-col justify-center bg-primary-light p-4">
            <p className="font-semibold text-primary-dark">Not sure where to start?</p>
            <p className="mt-1 text-sm text-stone-600">Check required documents before you visit the office.</p>
            <Link href="/documents" className="mt-3 inline-flex h-9 w-fit items-center rounded-md bg-primary px-3 text-sm text-white hover:bg-primary-dark">My documents</Link>
          </Card>
        </div>
      </section>

      <section className="border-y border-line bg-white">
        <div className="mx-auto max-w-6xl px-4 py-10">
          <h2 className="text-xl font-semibold tracking-tight">How it works</h2>
          <p className="mt-1 text-sm text-mutedtext">Four steps from signup to approval.</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: FileCheck, t: "1. Create your account", d: "Sign up with your email and phone. Takes about 2 minutes." },
              { icon: Clock, t: "2. Choose a service", d: "National ID, Driving License, PAN, Voter Card or Bluebook." },
              { icon: ShieldCheck, t: "3. Submit your information", d: "Upload citizenship, photos and supporting papers." },
              { icon: Megaphone, t: "4. Track your application", d: "Follow Submitted, Under Review, Processing, Approved." },
            ].map((s) => (
              <Card key={s.t} className="p-4">
                <s.icon size={18} className="text-primary" />
                <p className="mt-2 text-sm font-semibold">{s.t}</p>
                <p className="mt-1 text-sm text-mutedtext">{s.d}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-3 px-4 py-10 md:grid-cols-3">
        <Card className="p-4">
          <h3 className="font-semibold">Community</h3>
          <p className="mt-1 text-sm text-mutedtext">Vote in polls, report road, waste, electricity or water issues, and read announcements.</p>
          <p className="mt-2 text-sm">Poll: What service should be improved next?</p>
          <Link href="/community" className="mt-2 inline-block text-sm font-medium text-primary hover:underline">Open community</Link>
        </Card>
        <Card className="p-4">
          <h3 className="font-semibold">Secure document handling</h3>
          <p className="mt-1 text-sm text-mutedtext">Securely manage your personal documents and service information. Numbers stay masked and access is verified.</p>
          <Link href="/about" className="mt-2 inline-block text-sm font-medium text-primary hover:underline">How we handle data</Link>
        </Card>
        <Card className="p-4">
          <h3 className="font-semibold">Visit the office</h3>
          <p className="mt-1 text-sm text-mutedtext">District offices open Sun to Fri, 10 to 5. Bring originals for final pickup.</p>
          <Link href="/about" className="mt-2 inline-block text-sm font-medium text-primary hover:underline">Office info</Link>
        </Card>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-4">
        <div className="flex flex-col items-start justify-between gap-3 rounded-lg bg-primary p-6 text-white sm:flex-row sm:items-center">
          <div>
            <h2 className="text-lg font-semibold">Ready to skip the queue?</h2>
            <p className="text-sm text-orange-100">Create a free account with your email and phone. 2 minutes.</p>
          </div>
          <div className="flex gap-2">
            <Link href="/register" className="inline-flex h-10 items-center rounded-md bg-white px-4 text-sm font-medium text-primary hover:bg-orange-50">Create account</Link>
            <Link href="/login" className="inline-flex h-10 items-center rounded-md border border-orange-200 px-4 text-sm text-white hover:bg-white/10">Login</Link>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
