import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Navbar from "@/app/models/Navbar";
import { verifyAdmin } from "@/lib/verifyAdmin";


export async function GET() {
    try {
        await connectDB();
        const navbar = await Navbar.findOne({});
        if (!navbar) {
            return NextResponse.json({ message: "Navbar not found" }, { status: 404 });
        }
        return NextResponse.json({data:navbar,message:"Navbar fetched successfully"}, { status: 200 });
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
        const navbar = await Navbar.findOneAndUpdate({}, body,{upsert:true,new:true});
        if (!navbar) {
            return NextResponse.json({ message: "Navbar not found" }, { status: 404 });
        }
        return NextResponse.json({message:"Navbar updated successfully"}, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
