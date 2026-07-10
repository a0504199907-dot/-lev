import { NextResponse } from "next/server";

const ADMIN_COOKIE = "bt_admin";

export async function POST(req: Request) {
  const { password } = (await req.json().catch(() => ({}))) as {
    password?: string;
  };
  const expected = process.env.ADMIN_PASSWORD || "business2026";

  if (!password || password !== expected) {
    return NextResponse.json(
      { ok: false, error: "סיסמה שגויה" },
      { status: 401 }
    );
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE, expected, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });
  return res;
}
