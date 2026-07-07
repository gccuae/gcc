import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import * as jose from "jose";

const ROLE_ALLOWED_PREFIXES: Record<string, string[]> = {
  hr: [
    "/admin/current-openings",
    "/admin/current-openings/enquiries",
    "/admin/current-openings/general-enquiries",
    "/api/admin/current-openings",
    "/api/admin/current-openings/department",
    "/api/admin/current-openings/location",
    "/api/admin/career",
    "/api/admin/general-career",
    "/api/admin/general-career/bulk-delete",
    "/api/admin/career/bulk-delete"
  ],
};

const ROLE_DEFAULT_REDIRECT: Record<string, string> = {
  hr: "/admin/current-openings",
};

// Where a role lands if they visit /admin/login while already authenticated
const ROLE_HOME: Record<string, string> = {
  hr: "/admin/current-openings",
  admin: "/admin/home",
};

function isAllowed(role: string, path: string): boolean {
  if (role === "admin") return true;

  const allowed = ROLE_ALLOWED_PREFIXES[role] || [];
  return allowed.some((prefix) => path.startsWith(prefix));
}

async function getValidRole(request: NextRequest): Promise<string | null> {
  const token = request.cookies.get("adminToken")?.value || "";
  if (!token) return null;

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET || "your-secret-key");
    const { payload } = await jose.jwtVerify(token, secret);
    return (payload.role as string) || "admin";
  } catch {
    return null;
  }
}

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const path = request.nextUrl.pathname;

  response.headers.set("Access-Control-Allow-Origin", "https://docs-rho-wine.vercel.app");
  response.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");

  // If an already-authenticated user hits the login page, bounce them
  // to their role's home instead of showing the login form again.
  if (path === "/admin/login") {
    const role = await getValidRole(request);
    if (role) {
      const redirectTo = ROLE_HOME[role] || "/admin/home";
      return NextResponse.redirect(new URL(redirectTo, request.url));
    }
    return response;
  }

  // Routes every authenticated role must always be able to reach,
  // regardless of their specific permission set.
  const isAlwaysAllowedRoute =
    path === "/admin/logout" ||
    path === "/api/admin/login" ||
    path === "/api/admin/logout" ||
    path === "/api/admin/me";

  const isProtectedRoute = path.startsWith("/admin") && !isAlwaysAllowedRoute;
  const isProtectedApi = path.startsWith("/api/admin") && !isAlwaysAllowedRoute;

  if (isProtectedRoute || isProtectedApi) {
    const token = request.cookies.get("adminToken")?.value || "";

    if (!token) {
      if (isProtectedApi) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
      }
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }

    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET || "your-secret-key");
      const { payload } = await jose.jwtVerify(token, secret);
      const role = (payload.role as string) || "admin";

      if (!isAllowed(role, path)) {
        if (isProtectedApi) {
          return NextResponse.json({ message: "Forbidden" }, { status: 403 });
        }
        const redirectTo = ROLE_DEFAULT_REDIRECT[role] || "/admin/login";
        return NextResponse.redirect(new URL(redirectTo, request.url));
      }

      return response;
    } catch (error) {
      console.log(error);
      if (isProtectedApi) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
      }
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  return response;
}

export const config = {
  matcher: ["/api/:path*", "/admin/:path*"],
};