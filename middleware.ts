import { NextResponse, type NextRequest } from "next/server";

const ADMIN_COOKIE = "bt_admin";

function adminPassword() {
  return process.env.ADMIN_PASSWORD || "business2026";
}

export function middleware(req: NextRequest) {
  const token = req.cookies.get(ADMIN_COOKIE)?.value;
  if (token !== adminPassword()) {
    const url = req.nextUrl.clone();
    url.pathname = "/admin-login";
    url.searchParams.set("from", req.nextUrl.pathname);
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};
