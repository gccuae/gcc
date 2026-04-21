import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import SocialMedia from "@/app/models/SocialMedia";
import { verifyAdmin } from "@/lib/verifyAdmin";


export async function GET() {
    try {
        console.log("GTTT");
        
        await connectDB();
        const socialMedia = await SocialMedia.findOne({});
        if (!socialMedia) {
            return NextResponse.json({ message: "Social Media not found" }, { status: 404 });
        }
        return NextResponse.json({data:socialMedia,message:"Social Media fetched successfully"}, { status: 200 });
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
        const socialMedia = await SocialMedia.findOneAndUpdate({}, body,{upsert:true,new:true});
        if (!socialMedia) {
            return NextResponse.json({ message: "Social Media not found" }, { status: 404 });
        }
        return NextResponse.json({message:"Social Media updated successfully"}, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
