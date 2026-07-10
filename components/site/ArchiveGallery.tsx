"use client";

import { useEffect, useState } from "react";
import { Download, ExternalLink, FileText, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getArchives } from "@/lib/data";
import type { ArchiveIssue } from "@/lib/types";
import { formatHebrewDateFull } from "@/lib/weeks";

export function ArchiveGallery() {
  const [issues, setIssues] = useState<ArchiveIssue[] | null>(null);

  useEffect(() => {
    getArchives().then(setIssues);
  }, []);

  return (
    <section id="archive" className="bg-slate-50 py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-charcoal sm:text-4xl">
            מהדורות קודמות
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-slate-500">
            כך נראו הלוחות השבועיים האחרונים שנתלו ברחבי האזור — לחצו לצפייה
            ולהורדה של קובץ ה-PDF המלא.
          </p>
        </div>

        {issues === null ? (
          <div className="mt-12 flex justify-center text-slate-400">
            <Loader2 className="ml-2 h-6 w-6 animate-spin text-coral" />
            טוען את הארכיון…
          </div>
        ) : issues.length === 0 ? (
          <p className="mt-12 text-center text-slate-400">
            הארכיון עוד ריק — המהדורה הראשונה כבר בדרך לדפוס.
          </p>
        ) : (
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {issues.map((issue) => (
              <article
                key={issue.id}
                className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <a
                  href={issue.pdf_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-charcoal">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={issue.preview_image_url}
                      alt={issue.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <span className="absolute inset-0 flex items-center justify-center bg-charcoal-deep/0 transition-colors duration-300 group-hover:bg-charcoal-deep/50">
                      <span className="flex items-center gap-2 rounded-full bg-coral px-4 py-2 text-sm font-bold text-white opacity-0 shadow-lg transition-opacity duration-300 group-hover:opacity-100">
                        <ExternalLink className="h-4 w-4" />
                        פתיחת המהדורה
                      </span>
                    </span>
                  </div>
                </a>
                <div className="flex items-center justify-between gap-3 p-5">
                  <div className="min-w-0">
                    <h3 className="truncate font-bold text-charcoal">{issue.title}</h3>
                    <p className="mt-0.5 flex items-center gap-1.5 text-xs text-slate-500">
                      <FileText className="h-3.5 w-3.5 text-coral" />
                      פורסם ב-{formatHebrewDateFull(issue.published_date)}
                    </p>
                  </div>
                  <a href={issue.pdf_url} download target="_blank" rel="noopener noreferrer">
                    <Button variant="ghost" size="icon" aria-label="הורדת PDF">
                      <Download className="h-5 w-5 text-coral" />
                    </Button>
                  </a>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
