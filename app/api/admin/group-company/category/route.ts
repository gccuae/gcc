import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import GroupCompany from "@/app/models/GroupCompany";
import { verifyAdmin } from "@/lib/verifyAdmin";

export async function POST(req:NextRequest) {
    try {
        await connectDB();
        const isAdmin = await verifyAdmin(req);
        if (!isAdmin) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
        const { name } = await req.json();
        const groupCompany = await GroupCompany.findOne({})
        if(groupCompany){
            groupCompany.categories.push({ category: name });
            await groupCompany.save();
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
        const groupCompany = await GroupCompany.findOne({});
        if(groupCompany){
            const category = groupCompany.categories.find((category:{_id:string, category:string})=>category._id == id);
            if(category){
                await groupCompany.secondSection.items.map((item:{category:string})=>{
                    if(item.category == category.category){
                        item.category = name;
                    }
                })
                category.category = name;
                await groupCompany.save();
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
        const groupCompany = await GroupCompany.findOne({});
        if(groupCompany){
            const category = groupCompany.categories.find((category:{_id:string, category:string})=>category._id == id);
            groupCompany.categories = groupCompany.categories.filter((category:{_id:string, category:string})=>category._id != id);
            await groupCompany.save();
            await groupCompany.secondSection.items.map((item:{category:string})=>{
                if(item.category == category.category){
                    return item.category = "";
                }
            })
            await groupCompany.save();
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
        const groupCompany = await GroupCompany.findOne({});
        if(groupCompany){
            return NextResponse.json({ data: groupCompany.categories }, { status: 200 });
        }else{
            return NextResponse.json({ message: "Error fetching category" }, { status: 500 });
        }
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: "Error fetching category" }, { status: 500 });
    }
}
