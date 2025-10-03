import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Team from "@/app/models/Team";
import { verifyAdmin } from "@/lib/verifyAdmin";

export async function POST(req:NextRequest) {
    try {
        await connectDB();
        const isAdmin = await verifyAdmin(req);
        if (!isAdmin) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
        const { name } = await req.json();
        const team = await Team.findOne({})
        if(team){
            team.categories.push({ category: name });
            await team.save();
            return NextResponse.json({ message: "category added successfully" }, { status: 200 });
        }else{
            return NextResponse.json({ message: "Error adding category" }, { status: 500 });
        }
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: "Error adding category" }, { status: 500 });
    }
}

export async function PATCH(req:NextRequest) {
    try {
        await connectDB();
        const isAdmin = await verifyAdmin(req);
        if (!isAdmin) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
        const searchParams = req.nextUrl.searchParams;
        const id = searchParams.get("id");
        const { name } = await req.json();
        const team = await Team.findOne({});
        if(team){
            const category = team.categories.find((category:{_id:string, category:string})=>category._id == id);
            console.log(category)
            if(category){
                await team.secondSection.items.map((item:{category:string})=>{
                    if(item.category == category.category){
                        item.category = name;
                    }
                })
                category.category = name;
                await team.save();
                return NextResponse.json({ message: "category updated successfully" }, { status: 200 });
            }
        }else{
            return NextResponse.json({ message: "Error updating category" }, { status: 500 });
        }
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: "Error updating category" }, { status: 500 });
    }
}

export async function DELETE(req:NextRequest) {
    try {
        await connectDB();
        const isAdmin = await verifyAdmin(req);
        if (!isAdmin) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
        const searchParams = req.nextUrl.searchParams;
        const id = searchParams.get("id");
        const team = await Team.findOne({});
        if(team){
            const category = team.categories.find((category:{_id:string, category:string})=>category._id == id);
            await team.secondSection.items.map((item:{category:string})=>{
                if(item.category == category.category){
                    item.category = "";
                }
            })
            team.categories = team.categories.filter((category:{_id:string, category:string})=>category._id != id);
            await team.save();
            return NextResponse.json({ message: "category deleted successfully" }, { status: 200 });
        }else{
            return NextResponse.json({ message: "Error deleting category" }, { status: 500 });
        }
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: "Error deleting category" }, { status: 500 });
    }
}

export async function GET() {
    try {
        await connectDB();
        const team = await Team.findOne({});
        if(team){
            return NextResponse.json({ data: team.categories }, { status: 200 });
        }else{
            return NextResponse.json({ message: "Error fetching category" }, { status: 500 });
        }
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: "Error fetching category" }, { status: 500 });
    }
}
