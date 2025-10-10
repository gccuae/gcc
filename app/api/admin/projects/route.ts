import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Project from "@/app/models/Project";
import { verifyAdmin } from "@/lib/verifyAdmin";
import "@/app/models/Sector";
import "@/app/models/Location";
import "@/app/models/ProjectType";


export async function GET(request: NextRequest) {
    try {
        await connectDB();
        const id = request.nextUrl.searchParams.get("id");
        const slug = request.nextUrl.searchParams.get("slug");
        if (id) {
            const project = await Project.findOne({}).populate("projects.secondSection.sector", "name _id").populate("projects.secondSection.location", "name _id").populate("projects.secondSection.projectType", "name _id");
            const foundProject = project.projects.find((project: { _id: string }) => project._id.toString() === id);
            if (!foundProject) {
                return NextResponse.json({ message: "Project not found" }, { status: 404 });
            }
            return NextResponse.json({ data: foundProject, message: "Project fetched successfully" }, { status: 200 });
        } else if (slug) {
            const project = await Project.findOne({}).populate("projects.secondSection.sector", "name _id").populate("projects.secondSection.location", "name _id").populate("projects.secondSection.projectType", "name _id");
            const foundProject = project.projects.find((project: { slug: string }) => project.slug === slug);
            if (!foundProject) {
                return NextResponse.json({ message: "Project not found" }, { status: 404 });
            }
            return NextResponse.json({ data: foundProject, message: "Project fetched successfully" }, { status: 200 });
        } else {
            const project = await Project.findOne({}).populate("projects.secondSection.sector", "name _id").populate("projects.secondSection.location", "name _id").populate("projects.secondSection.projectType", "name _id");
            if (!project) {
                return NextResponse.json({ message: "Project not found" }, { status: 404 });
            }
            return NextResponse.json({ data: project, message: "Project fetched successfully" }, { status: 200 });
        }

    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function PATCH(request: NextRequest) {
    try {
        const body = await request.json();
        const isAdmin = await verifyAdmin(request);
        const id = request.nextUrl.searchParams.get("id");
        if (!isAdmin) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
        await connectDB();

        const project = await Project.findOne({})
        if (id) {
            const foundProject = project.projects.find((project: { _id: string }) => project._id.toString() === id);
            if (!foundProject) {
                return NextResponse.json({ message: "Project not found" }, { status: 404 });
            }
            foundProject.firstSection.images = body.firstSection.images;
            foundProject.secondSection = body.secondSection;
            foundProject.thirdSection = body.thirdSection;
            foundProject.fourthSection = body.fourthSection;
            foundProject.banner = body.banner;
            foundProject.bannerAlt = body.bannerAlt;
            foundProject.thumbnail = body.thumbnail;
            foundProject.thumbnailAlt = body.thumbnailAlt;
            foundProject.title = body.title;
            foundProject.slug = body.slug;
            foundProject.latitude = body.latitude;
            foundProject.longitude = body.longitude;
            foundProject.metaTitle = body.metaTitle;
            foundProject.metaDescription = body.metaDescription;
            await project.save();
            return NextResponse.json({ data: project, message: "Project updated successfully" }, { status: 200 });
        }
        if (!project) {
            await Project.create({ ...body });
            return NextResponse.json({ data: project, message: "Project created successfully" }, { status: 200 });
        } else {
            await Project.findOneAndUpdate({}, body, { upsert: true, new: true });
            return NextResponse.json({ data: project, message: "Project updated successfully" }, { status: 200 });
        }
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
        const project = await Project.findOne({});
        project.projects.push(body);
        await project.save();
        return NextResponse.json({ data: project, message: "Project created successfully" }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest) {
    try {
        const id = request.nextUrl.searchParams.get("id");
        const isAdmin = await verifyAdmin(request);
        if (!isAdmin) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
        await connectDB();
        const project = await Project.findOne({});
        if (!project) {
            return NextResponse.json({ message: "Project not found" }, { status: 404 });
        }
        project.projects = project.projects.filter((project: { _id: string }) => project._id.toString() !== id);
        await project.save();
        return NextResponse.json({ data: project, message: "Project deleted successfully" }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}


