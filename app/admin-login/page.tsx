"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { KeyRound, LayoutGrid, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (res.ok) {
      router.replace(params.get("from") || "/admin");
      router.refresh();
    } else {
      setError("הסיסמה שגויה — נסו שוב.");
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-sm rounded-3xl bg-white p-8 shadow-2xl animate-pop-in"
    >
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-coral shadow-lg shadow-coral/30">
        <LayoutGrid className="h-6 w-6 text-white" />
      </div>
      <h1 className="mt-5 text-center text-xl font-extrabold text-charcoal">
        כניסה לניהול הלוח
      </h1>
      <p className="mt-1.5 text-center text-sm text-slate-500">
        Business Table — דשבורד המנהל
      </p>

      <div className="mt-6 space-y-1.5">
        <Label htmlFor="password">סיסמת מנהל</Label>
        <Input
          id="password"
          type="password"
          required
          autoFocus
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
        />
      </div>

      {error && (
        <p className="mt-3 rounded-xl bg-red-50 px-4 py-2 text-sm font-medium text-red-600">
          {error}
        </p>
      )}

      <Button type="submit" className="mt-5 w-full" disabled={loading}>
        {loading ? (
          <Loader2 className="h-5 w-5 animate-spin" />
        ) : (
          <KeyRound className="h-5 w-5" />
        )}
        כניסה לדשבורד
      </Button>

      <Link
        href="/"
        className="mt-4 block text-center text-xs text-slate-400 transition-colors hover:text-coral"
      >
        חזרה לאתר הציבורי
      </Link>
    </form>
  );
}

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-charcoal p-4">
      <Suspense>
        <LoginForm />
      </Suspense>
    </div>
  );
}
