import GeneralCareer from "@/app/models/GeneralCareer";
import connectDB from "@/lib/mongodb";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  await connectDB();

  const { ids } = await req.json();

  if (!ids || !Array.isArray(ids) || ids.length === 0) {
    return Response.json(
      { message: "No IDs provided" },
      { status: 400 }
    );
  }

  await GeneralCareer.deleteMany({ _id: { $in: ids } });

  return Response.json({
    message: `${ids.length} application(s) deleted successfully`,
  });
}