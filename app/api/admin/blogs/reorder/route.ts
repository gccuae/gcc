import { NextRequest, NextResponse } from "next/server";
import Project from "@/app/models/Project";
import connectDB from "@/lib/mongodb";
import mongoose from "mongoose";
export async function POST(req: NextRequest) {
    const session = await mongoose.startSession()
    try {
        session.startTransaction()
        await connectDB()
        const formData = await req.formData()
        const blogs = formData.get("blogs") as string
        const actualBlogs = JSON.parse(blogs)
        const allBlogs = await Project.findOne({})
        allBlogs.blogs = actualBlogs
        await allBlogs.save()
        session.commitTransaction()
        return NextResponse.json({ message: "Blogs reordered successfully", success: true }, { status: 200 })
    } catch (error) {
        console.log(error)
        session.abortTransaction()
        return NextResponse.json({ message: "Internal Server Error", success: false }, { status: 500 })
    }
    finally {
        session.endSession()
    }
}


