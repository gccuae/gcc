import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Team from "@/app/models/Team";
import { verifyAdmin } from "@/lib/verifyAdmin";


export async function GET() {
    try {
        await connectDB();
        const team = await Team.findOne({});
        if (!team) {
            return NextResponse.json({ message: "Team not found" }, { status: 404 });
        }
        return NextResponse.json({data:team,message:"Team fetched successfully"}, { status: 200 });
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
        const team = await Team.findOneAndUpdate({}, body,{upsert:true,new:true});
        if (!team) {
            return NextResponse.json({ message: "Team not found" }, { status: 404 });
        }
        return NextResponse.json({data:team,message:"Team updated successfully"}, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}