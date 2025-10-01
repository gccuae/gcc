import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import GroupCompany from "@/app/models/GroupCompany";
import { verifyAdmin } from "@/lib/verifyAdmin";


export async function GET() {
    try {
        await connectDB();
        const groupCompany = await GroupCompany.findOne({});
        if (!groupCompany) {
            return NextResponse.json({ message: "Group Company not found" }, { status: 404 });
        }
        return NextResponse.json({data:groupCompany,message:"Group Company fetched successfully"}, { status: 200 });
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
        const groupCompany = await GroupCompany.findOneAndUpdate({}, body,{upsert:true,new:true});
        if (!groupCompany) {
            return NextResponse.json({ message: "Group Company not found" }, { status: 404 });
        }
        return NextResponse.json({data:groupCompany,message:"Group Company updated successfully"}, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}