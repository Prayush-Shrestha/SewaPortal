"use client";

export default function ErrorPage({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <p className="text-sm font-medium text-primary">500</p>
      <h1 className="mt-1 text-2xl font-semibold">Something went wrong</h1>
      <p className="mt-1 max-w-sm text-sm text-mutedtext">{error.message || "The server hiccuped. Your applications are safe."}</p>
      <button onClick={reset} className="mt-4 inline-flex h-10 items-center rounded-md bg-primary px-4 text-sm text-white">
        Try again
      </button>
    </div>
  );
}
