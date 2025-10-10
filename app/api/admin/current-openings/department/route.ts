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
        return NextResponse.json({data:openings.departments,message:"Openings fetched successfully"}, { status: 200 });
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
        openings.departments.push({name:body.name})
        await openings.save()
        return NextResponse.json({data:openings,message:"Department added successfully"}, { status: 200 });
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
        const department = await openings.departments.find((department: { _id: string; })=>department._id.toString() === id);
        if (!department) {
            return NextResponse.json({ message: "Department not found" }, { status: 404 });
        }
        openings.openings.map((opening:{firstSection:{department:{_id:string,name:string}}})=>{
            console.log(opening,department.name)
            if(opening.firstSection.department === department.name){
                console.log(opening.firstSection.department.name)
                opening.firstSection.department = body.name;
            }
        })
        department.name = body.name;
        
        await openings.save()
        return NextResponse.json({data:openings,message:"Department updated successfully"}, { status: 200 });
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
        openings.openings.map((opening:{firstSection:{department:string}})=>{
            if(opening.firstSection.department === openings.departments.filter((department: { _id: string; })=>department._id.toString() == id)[0].name){
                opening.firstSection.department = "";
            }
        })
        openings.departments = openings.departments.filter((department: { _id: string; })=>department._id.toString() !== id);
        
        await openings.save()
        return NextResponse.json({data:openings,message:"Department deleted successfully"}, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}

