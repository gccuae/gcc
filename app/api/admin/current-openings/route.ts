import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Openings from "@/app/models/Openings";
import { verifyAdmin } from "@/lib/verifyAdmin";


export async function GET(request:NextRequest) {
    try {
        await connectDB();
        const openings = await Openings.findOne({});
        if (!openings) {
            return NextResponse.json({ message: "Openings not found" }, { status: 404 });
        }
        const id = request.nextUrl.searchParams.get("id");
        const slug = request.nextUrl.searchParams.get("slug");
        if(id){
            const opening = openings.openings.find((opening:{_id:string})=>opening._id.toString() === id);
            if(!opening){
                return NextResponse.json({ message: "Opening not found" }, { status: 404 });
            }
            return NextResponse.json({data:opening,message:"Opening fetched successfully"}, { status: 200 });
        }else if (slug){
            const opening = openings.openings.find((opening:{firstSection:{slug:string}})=>opening.firstSection.slug === slug);
            if(!opening){
                return NextResponse.json({ message: "Opening not found" }, { status: 404 });
            }
            return NextResponse.json({data:opening,message:"Opening fetched successfully"}, { status: 200 });
        }
        return NextResponse.json({data:openings,message:"Openings fetched successfully"}, { status: 200 });
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
        const id = request.nextUrl.searchParams.get("id");
        if(id){
            const openings = await Openings.findOne({});
            const opening = openings.openings.find((opening:{_id:string})=>opening._id.toString() === id);
            if(!opening){
                return NextResponse.json({ message: "Opening not found" }, { status: 404 });
            }
            opening.metaTitle = body.metaTitle;
            opening.metaDescription = body.metaDescription;
            opening.firstSection = body.firstSection;
            opening.secondSection = body.secondSection;
            opening.thirdSection = body.thirdSection;
            opening.forthSection = body.forthSection;
            opening.status = body.status;
            await openings.save();
            return NextResponse.json({data:opening,message:"Opening updated successfully"}, { status: 200 });
            
        }
        const openings = await Openings.findOneAndUpdate({}, body,{upsert:true,new:true});
        if (!openings) {
            return NextResponse.json({ message: "Openings not found" }, { status: 404 });
        }
        return NextResponse.json({data:openings,message:"Openings updated successfully"}, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const isAdmin = await verifyAdmin(request);
        if (!isAdmin) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
        await connectDB();
        const openings = await Openings.findOne({});
        if (!openings) {
            return NextResponse.json({ message: "Openings not found" }, { status: 404 });
        }
        openings.openings.push(body);
        await openings.save();
        return NextResponse.json({data:openings,message:"Openings added successfully"}, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest) {
    try {
        const isAdmin = await verifyAdmin(request);
        if (!isAdmin) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
        await connectDB();
        const id = request.nextUrl.searchParams.get("id");
        if(!id){
            return NextResponse.json({ message: "Opening not found" }, { status: 404 });
        }
        const openings = await Openings.findOne({});
        if (!openings) {
            return NextResponse.json({ message: "Openings not found" }, { status: 404 });
        }
        openings.openings = openings.openings.filter((opening:{_id:string})=>opening._id.toString() !== id);
        await openings.save();
        return NextResponse.json({data:openings,message:"Openings deleted successfully"}, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}


