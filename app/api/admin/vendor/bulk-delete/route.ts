import { NextResponse } from "next/server";
import connectDb from "@/lib/mongodb";
import Vendor from "@/app/models/Vendor";

export async function POST(req: Request) {
    try {
        await connectDb();

        const { ids } = await req.json();

        await Vendor.deleteMany({
            _id: { $in: ids },
        });

        return NextResponse.json({
            message: "Enquiries deleted successfully",
        });

    } catch (error) {
        return NextResponse.json(
            { message: "Delete failed" },
            { status: 500 }
        );
    }
}