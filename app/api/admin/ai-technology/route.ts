import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import AiTechnology from "@/app/models/AiTechnology";
import { verifyAdmin } from "@/lib/verifyAdmin";


export async function GET() {
    try {
        await connectDB();
        const aiTechnology = await AiTechnology.findOne({});
        if (!aiTechnology) {
            return NextResponse.json({ message: "AiTechnology not found" }, { status: 404 });
        }
        return NextResponse.json({data:aiTechnology,message:"AiTechnology fetched successfully"}, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function PATCH(request: NextRequest) {
    try {
        const body = await request.json();
        const isAdmin = await verifyAdmin(request);
        if (!isAdmin) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
        await connectDB();
        const aiTechnology = await AiTechnology.findOneAndUpdate({}, body,{upsert:true,new:true});
        if (!aiTechnology) {
            return NextResponse.json({ message: "AiTechnology not found" }, { status: 404 });
        }
        return NextResponse.json({data:aiTechnology,message:"AiTechnology updated successfully"}, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}