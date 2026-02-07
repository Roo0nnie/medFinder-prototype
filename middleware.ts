import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PUBLIC_PATHS = ["/login", "/register"];
const ROLE_ROUTES: Record<string, string[]> = {
  admin: ["/admin"],
  owner: ["/owner", "/profile"],
  staff: ["/staff", "/profile"],
  customer: ["/", "/pharmacies", "/contact", "/profile"],
};

function getUserFromCookie(request: NextRequest) {
  const cookie = request.cookies.get("product-finder-user");
  if (cookie?.value) {
    try {
      return JSON.parse(decodeURIComponent(cookie.value)) as { role: string };
    } catch {
      return null;
    }
  }
  return null;
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const user = getUserFromCookie(request);

  if (PUBLIC_PATHS.some((p) => pathname.startsWith(p))) {
    if (user?.role) {
      const home = user.role === "customer" ? "/" : "/" + user.role;
      return NextResponse.redirect(new URL(home, request.url));
    }
    return NextResponse.next();
  }

  if (!user) {
    const redirect = new URL("/login", request.url);
    redirect.searchParams.set("from", pathname);
    return NextResponse.redirect(redirect);
  }

  const role = user.role;
  const allowedPaths = ROLE_ROUTES[role] ?? [];
  const isAllowed = allowedPaths.some((p) => {
    if (p === "/") return pathname === "/";
    return pathname === p || pathname.startsWith(p + "/");
  });

  if (!isAllowed) {
    const fallback = role === "customer" ? "/" : `/${role}`;
    return NextResponse.redirect(new URL(fallback, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.svg$|.*\\.png$).*)",
  ],
};
