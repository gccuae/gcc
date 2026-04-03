import { NextResponse } from "next/server";
import connectDb from "@/lib/mongodb";
import Career from "@/app/models/Career";

export async function POST(req: Request) {
    try {
        await connectDb();

        const { ids } = await req.json();

        await Career.deleteMany({
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