import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <p className="text-sm font-medium text-primary">404</p>
      <h1 className="mt-1 text-2xl font-semibold">Page not found</h1>
      <p className="mt-1 text-sm text-mutedtext">The ward register doesn&apos;t list this address. Try the dashboard or services.</p>
      <div className="mt-4 flex gap-2">
        <Link href="/" className="inline-flex h-10 items-center rounded-md bg-primary px-4 text-sm text-white">Home</Link>
        <Link href="/services" className="inline-flex h-10 items-center rounded-md border border-line px-4 text-sm">Services</Link>
      </div>
    </div>
  );
}
