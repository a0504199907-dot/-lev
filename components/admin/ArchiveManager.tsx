"use client";

import { useState } from "react";
import {
  FileText,
  FileUp,
  ImageUp,
  Loader2,
  Trash2,
  UploadCloud,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createArchive, deleteArchive } from "@/lib/data";
import type { ArchiveIssue } from "@/lib/types";
import { toISODate, formatHebrewDateFull } from "@/lib/weeks";

interface ArchiveManagerProps {
  archives: ArchiveIssue[];
  onChanged: () => Promise<void>;
}

export function ArchiveManager({ archives, onChanged }: ArchiveManagerProps) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState(() => toISODate(new Date()));
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [previewFile, setPreviewFile] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!pdfFile || !previewFile) {
      setError("נא לצרף גם קובץ PDF וגם תמונת תצוגה מקדימה.");
      return;
    }
    setBusy(true);
    setError(null);
    setSuccess(false);
    try {
      await createArchive({
        title: title.trim(),
        published_date: date,
        pdfFile,
        previewFile,
      });
      await onChanged();
      setTitle("");
      setPdfFile(null);
      setPreviewFile(null);
      setSuccess(true);
    } catch {
      setError("ההעלאה נכשלה — נסו שוב.");
    } finally {
      setBusy(false);
    }
  }

  async function handleDelete(id: string) {
    setDeletingId(id);
    try {
      await deleteArchive(id);
      await onChanged();
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div className="grid gap-8 lg:grid-cols-5">
      {/* טופס העלאה */}
      <Card className="h-fit lg:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UploadCloud className="h-5 w-5 text-coral" />
            העלאת מהדורה חדשה לארכיון
          </CardTitle>
          <p className="text-sm text-slate-500">
            המהדורה תופיע אוטומטית בגלריית "מהדורות קודמות" באתר הציבורי.
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="a-title">כותרת המהדורה</Label>
              <Input
                id="a-title"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder='לדוגמה: לוח העסקים השבועי — מהדורה 43'
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="a-date">תאריך פרסום</Label>
              <Input
                id="a-date"
                required
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="a-pdf">קובץ ה-PDF של הלוח</Label>
              <label
                htmlFor="a-pdf"
                className="flex cursor-pointer items-center gap-2.5 rounded-xl border-2 border-dashed border-slate-300 px-4 py-3 text-sm transition-colors hover:border-coral hover:bg-coral-50"
              >
                <FileUp className="h-5 w-5 shrink-0 text-coral" />
                <span className="truncate font-medium text-slate-600">
                  {pdfFile ? pdfFile.name : "בחירת קובץ PDF"}
                </span>
              </label>
              <input
                id="a-pdf"
                type="file"
                accept="application/pdf"
                className="hidden"
                onChange={(e) => setPdfFile(e.target.files?.[0] ?? null)}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="a-preview">תמונת תצוגה מקדימה</Label>
              <label
                htmlFor="a-preview"
                className="flex cursor-pointer items-center gap-2.5 rounded-xl border-2 border-dashed border-slate-300 px-4 py-3 text-sm transition-colors hover:border-coral hover:bg-coral-50"
              >
                <ImageUp className="h-5 w-5 shrink-0 text-coral" />
                <span className="truncate font-medium text-slate-600">
                  {previewFile ? previewFile.name : "בחירת תמונה (JPG/PNG)"}
                </span>
              </label>
              <input
                id="a-preview"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => setPreviewFile(e.target.files?.[0] ?? null)}
              />
            </div>

            {error && (
              <p className="rounded-xl bg-red-50 px-4 py-2.5 text-sm font-medium text-red-600">
                {error}
              </p>
            )}
            {success && (
              <p className="rounded-xl bg-emerald-50 px-4 py-2.5 text-sm font-medium text-emerald-700">
                המהדורה עלתה לארכיון הציבורי בהצלחה!
              </p>
            )}

            <Button type="submit" className="w-full" disabled={busy}>
              {busy ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  מעלה את הקבצים…
                </>
              ) : (
                <>
                  <UploadCloud className="h-5 w-5" />
                  פרסם בארכיון
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* מהדורות קיימות */}
      <div className="lg:col-span-3">
        <h2 className="mb-4 text-lg font-extrabold text-charcoal">
          מהדורות בארכיון ({archives.length})
        </h2>
        {archives.length === 0 ? (
          <div className="rounded-3xl bg-white py-16 text-center text-slate-400 shadow-sm">
            <FileText className="mx-auto mb-3 h-10 w-10 text-slate-300" />
            הארכיון עוד ריק — העלו את המהדורה הראשונה.
          </div>
        ) : (
          <ul className="space-y-3">
            {archives.map((issue) => (
              <li
                key={issue.id}
                className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={issue.preview_image_url}
                  alt={issue.title}
                  className="h-16 w-24 shrink-0 rounded-xl bg-charcoal object-cover"
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate font-bold text-charcoal">{issue.title}</p>
                  <p className="text-xs text-slate-500">
                    {formatHebrewDateFull(issue.published_date)}
                  </p>
                  <a
                    href={issue.pdf_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-0.5 inline-flex items-center gap-1 text-xs font-semibold text-coral hover:underline"
                  >
                    <FileText className="h-3.5 w-3.5" />
                    פתיחת ה-PDF
                  </a>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="מחיקת מהדורה"
                  disabled={deletingId === issue.id}
                  onClick={() => handleDelete(issue.id)}
                >
                  {deletingId === issue.id ? (
                    <Loader2 className="h-5 w-5 animate-spin text-slate-400" />
                  ) : (
                    <Trash2 className="h-5 w-5 text-red-500" />
                  )}
                </Button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
