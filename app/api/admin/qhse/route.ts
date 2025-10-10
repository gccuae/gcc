import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Qhse from "@/app/models/Qhse";
import { verifyAdmin } from "@/lib/verifyAdmin";


export async function GET() {
    try {
        await connectDB();
        const qhse = await Qhse.findOne({});
        if (!qhse) {
            return NextResponse.json({ message: "Qhse not found" }, { status: 404 });
        }
        return NextResponse.json({data:qhse,message:"Qhse fetched successfully"}, { status: 200 });
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
        const qhse = await Qhse.findOneAndUpdate({}, body,{upsert:true,new:true});
        if (!qhse) {
            return NextResponse.json({ message: "Qhse not found" }, { status: 404 });
        }
        return NextResponse.json({data:qhse,message:"Qhse updated successfully"}, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}