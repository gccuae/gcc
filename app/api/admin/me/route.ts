// app/api/admin/me/route.ts
import { NextRequest, NextResponse } from "next/server";
import * as jose from "jose";

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get("adminToken")?.value || "";

    if (!token) {
      return NextResponse.json({ success: false }, { status: 401 });
    }

    const secret = new TextEncoder().encode(process.env.JWT_SECRET || "your-secret-key");
    const { payload } = await jose.jwtVerify(token, secret);

    return NextResponse.json(
      { success: true, role: (payload.role as string) || "admin" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 401 });
  }
}