import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-12 border-t border-line bg-white">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="font-semibold">SewaPortal Nepal</p>
          <p className="mt-2 text-sm text-mutedtext">
            One portal for National ID, driving license, PAN, voter card and bluebook services, plus payments and community voice.
          </p>
        </div>
        <div>
          <p className="text-sm font-semibold">Services</p>
          <ul className="mt-2 space-y-1.5 text-sm text-mutedtext">
            <li><Link href="/services/national-id" className="hover:text-primary">National ID</Link></li>
            <li><Link href="/services/driving-license" className="hover:text-primary">Driving License</Link></li>
            <li><Link href="/services/pan" className="hover:text-primary">PAN</Link></li>
            <li><Link href="/services/voter-card" className="hover:text-primary">Voter Card</Link></li>
            <li><Link href="/services/bluebook" className="hover:text-primary">Bluebook</Link></li>
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold">Community</p>
          <ul className="mt-2 space-y-1.5 text-sm text-mutedtext">
            <li><Link href="/community/polls" className="hover:text-primary">Polls</Link></li>
            <li><Link href="/community/report-issue" className="hover:text-primary">Report an Issue</Link></li>
            <li><Link href="/community" className="hover:text-primary">Announcements</Link></li>
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold">Contact</p>
          <ul className="mt-2 space-y-1.5 text-sm text-mutedtext">
            <li>Pulchowk, Lalitpur, Nepal</li>
            <li>01-5525001</li>
            <li>help@portal.np</li>
            <li>Sun–Fri, 10am–5pm</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-4 text-xs text-mutedtext sm:flex-row sm:justify-between">
          <span>© 2026 SewaPortal. Demo frontend for local government services.</span>
          <span>Data is illustrative. Connects to API at NEXT_PUBLIC_API_URL.</span>
        </div>
      </div>
    </footer>
  );
}
