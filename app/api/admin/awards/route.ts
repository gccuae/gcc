import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Awards from "@/app/models/Awards";
import { verifyAdmin } from "@/lib/verifyAdmin";


export async function GET(req: NextRequest) {
    try {
        await connectDB();
        const searchParams = req.nextUrl.searchParams;
        const id = searchParams.get("id");
        const awards = await Awards.findOne({});
        if(id){
            const awardsCategory = awards.categories.find((category:{_id:string, category:string})=>category._id == id);
            if(awardsCategory){
                return NextResponse.json({ data: awardsCategory }, { status: 200 });
            }else{
               return NextResponse.json({ message: "Error fetching awards" }, { status: 500 }); 
            }
        }else if(awards && !id){
            return NextResponse.json({ data: awards }, { status: 200 });
        }else{
            return NextResponse.json({ message: "Error fetching awards" }, { status: 500 });
        }
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: "Error fetching awards" }, { status: 500 });
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
        const awards = await Awards.findOneAndUpdate({}, body,{upsert:true,new:true});
        if (!awards) {
            return NextResponse.json({ message: "Awards not found" }, { status: 404 });
        }
        return NextResponse.json({data:awards,message:"Awards updated successfully"}, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}


export async function POST(req: NextRequest) {
    try {
        await connectDB();
        const isAdmin = await verifyAdmin(req);
        if(!isAdmin){
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        const searchParams = req.nextUrl.searchParams;
        const id = searchParams.get("id");
        const body = await req.json();
        if (!body) {
            return NextResponse.json({ error: "Files is required" }, { status: 400 });
        }
        const awards = await Awards.findOne({});
        if(awards){
            const awardsCategory = awards.categories.find((category:{_id:string, category:string})=>category._id == id);
            if(awardsCategory){
                awardsCategory.files = body;
                await awards.save();
                return NextResponse.json({ message: "awards updated successfully" }, { status: 200 });
            }
        }else{
            return NextResponse.json({ message: "Error updating awards" }, { status: 500 });
        }
    } catch (error) {
        console.log("Error adding awards", error);
        return NextResponse.json({ error: "Error adding awards" }, { status: 500 });
    }
}