"use client";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { AppShell } from "@/components/Shells";
import { Card, Button, StatusBadge } from "@/components/ui";
import { documents } from "@/lib/data";
import { maskDocNumber, formatDate } from "@/lib/utils";
import { Download, Trash2, RefreshCw, FileText } from "lucide-react";

export default function DocumentDetailPage() {
  const params = useParams();
  const router = useRouter();
  const doc = documents.find((d) => d.id === params.id) ?? documents[0];
  const [toast, setToast] = useState<string | null>(null);

  const act = (msg: string, del = false) => {
    if (del && !confirm("Delete this document? This cannot be undone.")) return;
    setToast(msg);
    setTimeout(() => { setToast(null); if (del) router.push("/documents"); }, 1800);
  };

  return (
    <AppShell>
      <button onClick={() => router.back()} className="mb-3 text-sm text-mutedtext hover:text-primary">← Back to documents</button>
      <div className="grid gap-3 md:grid-cols-2">
        <Card className="flex min-h-[280px] flex-col items-center justify-center bg-stone-50 p-8 text-center">
          <FileText size={40} className="text-stone-400" />
          <p className="mt-2 font-medium">{doc.fileName}</p>
          <p className="text-sm text-mutedtext">Preview placeholder — PDF / JPG renders here from the API.</p>
          <p className="mt-1 text-xs text-mutedtext">{doc.size} · uploaded {formatDate(doc.uploadedAt)}</p>
        </Card>
        <Card className="p-5">
          <div className="flex items-center justify-between">
            <h1 className="font-semibold">{doc.name}</h1>
            <StatusBadge status={doc.verified ? "Verified" : "Pending"} />
          </div>
          <dl className="mt-3 space-y-2 text-sm">
            <div className="flex justify-between border-b border-line pb-2"><dt className="text-mutedtext">Category</dt><dd>{doc.category}</dd></div>
            <div className="flex justify-between border-b border-line pb-2"><dt className="text-mutedtext">Document no.</dt><dd>{maskDocNumber(doc.docNumber)}</dd></div>
            <div className="flex justify-between border-b border-line pb-2"><dt className="text-mutedtext">File</dt><dd>{doc.fileName}</dd></div>
            <div className="flex justify-between"><dt className="text-mutedtext">Uploaded</dt><dd>{formatDate(doc.uploadedAt)}</dd></div>
          </dl>
          <div className="mt-4 flex flex-wrap gap-2">
            <Button size="sm" onClick={() => act("Download started (demo).")}><Download size={14} /> Download</Button>
            <Button size="sm" variant="outline" onClick={() => act("New file attached — pending verification.")}><RefreshCw size={14} /> Replace</Button>
            <Button size="sm" variant="danger" onClick={() => act("Document deleted.", true)}><Trash2 size={14} /> Delete</Button>
          </div>
        </Card>
      </div>
      {toast && <div className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2 rounded-md border border-green-200 bg-green-50 px-4 py-2 text-sm text-green-800">{toast}</div>}
    </AppShell>
  );
}
