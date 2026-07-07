import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import * as jose from "jose";

const ROLE_ALLOWED_PREFIXES: Record<string, string[]> = {
  hr: [
    "/admin/current-openings",
    "/admin/current-openings/enquiries",
    "/admin/current-openings/general-enquiries",
  ],
};

const ROLE_DEFAULT_REDIRECT: Record<string, string> = {
  hr: "/admin/current-openings",
};

const ROLE_HOME: Record<string, string> = {
  hr: "/admin/current-openings",
  admin: "/admin",
};

function isAllowed(role: string, path: string): boolean {
  if (role === "admin") return true;
  const allowed = ROLE_ALLOWED_PREFIXES[role] || [];
  return allowed.some((prefix) => path.startsWith(prefix));
}

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const path = request.nextUrl.pathname;

  // CORS headers
  response.headers.set("Access-Control-Allow-Origin", "https://docs-rho-wine.vercel.app");
  response.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");

  // Only /admin pages are gated. /api/* is never touched by this middleware.
  const isLoginPage = path === "/admin/login";
  const isProtectedRoute = path.startsWith("/admin") && !isLoginPage;

  const token = request.cookies.get("adminToken")?.value || "";
  const secret = new TextEncoder().encode(process.env.JWT_SECRET || "your-secret-key");

  // Already-logged-in user hitting the login page -> send to their role home.
  if (isLoginPage && token) {
    try {
      const { payload } = await jose.jwtVerify(token, secret);
      const role = (payload.role as string) || "admin";
      return NextResponse.redirect(new URL(ROLE_HOME[role] || "/admin", request.url));
    } catch {
      // invalid token — let them stay on login
    }
    return response;
  }

  if (isProtectedRoute) {
    if (!token) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }

    try {
      const { payload } = await jose.jwtVerify(token, secret);
      const role = (payload.role as string) || "admin";

      if (!isAllowed(role, path)) {
        const redirectTo = ROLE_DEFAULT_REDIRECT[role] || "/admin/login";
        return NextResponse.redirect(new URL(redirectTo, request.url));
      }

      return response;
    } catch {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  return response;
}

export const config = {
  matcher: ["/admin/:path*"],
};