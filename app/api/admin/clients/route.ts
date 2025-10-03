import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Clients from "@/app/models/Clients";
import { verifyAdmin } from "@/lib/verifyAdmin";


export async function GET() {
    try {
        await connectDB();
        const clients = await Clients.findOne({});
        if (!clients) {
            return NextResponse.json({ message: "Clients not found" }, { status: 404 });
        }
        return NextResponse.json({data:clients,message:"Clients fetched successfully"}, { status: 200 });
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
        const clients = await Clients.findOneAndUpdate({}, body,{upsert:true,new:true});
        if (!clients) {
            return NextResponse.json({ message: "Clients not found" }, { status: 404 });
        }
        return NextResponse.json({data:clients,message:"Clients updated successfully"}, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}