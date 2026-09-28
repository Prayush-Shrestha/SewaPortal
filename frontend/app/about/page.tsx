import { PublicShell } from "@/components/Shells";
import { Card, SectionTitle } from "@/components/ui";

export default function AboutPage() {
  return (
    <PublicShell>
      <h1 className="text-xl font-semibold tracking-tight">About SewaPortal</h1>
      <p className="mt-1 text-sm text-mutedtext">Built with ward secretaries in Lalitpur and Kathmandu to reduce repeat visits.</p>
      <div className="mt-5 grid gap-3 md:grid-cols-2">
        <Card className="p-5">
          <SectionTitle title="Our mission" />
          <p className="text-sm leading-relaxed text-stone-600">
            Every citizen should see the fee, required documents and live status before visiting an office.
            SewaPortal lists 5 core services first — National ID, Driving License, PAN, Voter Card and Bluebook —
            with Nepali-friendly receipts (NPR, eSewa/Khalti) and polls and issue reporting.
          </p>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-stone-600">
            <li>Fixed fees: NPR 0–2,500, no hidden charges</li>
            <li>Timeline: Submitted → Under Review → Processing → Approved</li>
            <li>Pickup with original documents + printed receipt</li>
          </ul>
        </Card>
        <Card className="p-5">
          <SectionTitle title="Office & contact" subtitle="Pilot municipalities" />
          <div className="space-y-2 text-sm">
            <p><span className="font-medium">Main desk:</span> Pulchowk Ward Office, Lalitpur-3, 01-5525001</p>
            <p><span className="font-medium">Kathmandu desk:</span> Ward 16, Balaju, 01-4351234</p>
            <p><span className="font-medium">Email:</span> help@portal.np (Sun–Fri 10–5)</p>
            <p><span className="font-medium">DAO liaison:</span> District Administration Office, Kathmandu for citizenship verification</p>
          </div>
          <div className="mt-4 rounded-md bg-primary-light p-3 text-sm">
            <p className="font-medium text-primary-dark">Holiday note</p>
            <p className="text-stone-600">Dashain week: counters open 10am–2pm. Online applications stay open.</p>
          </div>
        </Card>
      </div>
    </PublicShell>
  );
}
