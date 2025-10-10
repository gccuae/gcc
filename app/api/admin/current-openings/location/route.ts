import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Openings from "@/app/models/Openings";
import { verifyAdmin } from "@/lib/verifyAdmin";


export async function GET() {
    try {
        await connectDB();
        const openings = await Openings.findOne({});
        if (!openings) {
            return NextResponse.json({ message: "Openings not found" }, { status: 404 });
        }
        return NextResponse.json({data:openings.locations,message:"Openings fetched successfully"}, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
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
        openings.locations.push({name:body.name})
        await openings.save()
        return NextResponse.json({data:openings,message:"Location added successfully"}, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
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
        const openings = await Openings.findOne({});
        if (!openings) {
            return NextResponse.json({ message: "Openings not found" }, { status: 404 });
        }
        const location = await openings.locations.find((location: { _id: string; })=>location._id.toString() === id);
        if (!location) {
            return NextResponse.json({ message: "Location not found" }, { status: 404 });
        }
        openings.openings.map((opening:{firstSection:{location:string}})=>{
            console.log(opening,location.name)
            if(opening.firstSection.location === location.name){
                console.log(opening.firstSection.location)
                opening.firstSection.location = body.name;
            }
        })
        location.name = body.name;
        await openings.save()
        return NextResponse.json({data:openings,message:"Location updated successfully"}, { status: 200 });
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
        const openings = await Openings.findOne({});
        if (!openings) {
            return NextResponse.json({ message: "Openings not found" }, { status: 404 });
        }
        openings.openings.map((opening:{firstSection:{location:string}})=>{
            if(opening.firstSection.location === openings.locations.filter((location: { _id: string; })=>location._id.toString() == id)[0].name){
                opening.firstSection.location = "";
            }
        })
        openings.locations = openings.locations.filter((location: { _id: string; })=>location._id.toString() !== id);
        await openings.save()
        return NextResponse.json({data:openings,message:"Location deleted successfully"}, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}

