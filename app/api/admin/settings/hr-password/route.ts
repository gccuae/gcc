import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import * as jose from "jose";
import connectDB from "@/lib/mongodb";
import Admin from "@/app/models/Admin";

export async function PATCH(request: NextRequest) {
  try {
    await connectDB();

    // Verify the requester is a logged-in admin (not hr, not anonymous)
    const token = request.cookies.get("adminToken")?.value || "";
    if (!token) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const secret = new TextEncoder().encode(process.env.JWT_SECRET || "your-secret-key");
    const { payload } = await jose.jwtVerify(token, secret);
    const role = (payload.role as string) || "admin";

    if (role !== "admin") {
      return NextResponse.json(
        { success: false, message: "Only admins can update the HR password" },
        { status: 403 }
      );
    }

    const { newPassword } = await request.json();

    if (!newPassword || typeof newPassword !== "string" || newPassword.length < 6) {
      return NextResponse.json(
        { success: false, message: "Password must be at least 6 characters" },
        { status: 400 }
      );
    }

    const hrAdmin = await Admin.findOne({ role: "hr" });

    if (!hrAdmin) {
      return NextResponse.json(
        { success: false, message: "HR account not found" },
        { status: 404 }
      );
    }

    hrAdmin.password = await bcrypt.hash(newPassword, 10);
    await hrAdmin.save();

    return NextResponse.json(
      { success: true, message: "HR password updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating HR password", error);
    return NextResponse.json(
      { success: false, message: "Failed to update HR password" },
      { status: 500 }
    );
  }
}