import connectDB from "@/lib/mongodb";
import Icon from "@/app/models/Icons";
import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { verifyAdmin } from "@/lib/verifyAdmin";

export async function GET(request: NextRequest) {
    try {
        await connectDB();

        const { searchParams } = new URL(request.url);
        const page = Number(searchParams.get("page")) || 1;
        const limit = Number(searchParams.get("limit")) || 10;
        const skip = (page - 1) * limit;

        const total = await Icon.countDocuments();
        const icons = await Icon.find({})
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        return NextResponse.json(
            {
                data: icons,
                totalPages: Math.ceil(total / limit),
                page,
            },
            { status: 200 }
        );
    } catch (error) {
        console.log("Error fetching icons", error);
        return NextResponse.json({ message: "Failed to fetch icons" }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        await connectDB();
        const isAdmin = await verifyAdmin(request);
        if (!isAdmin) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const body = await request.json();
        const { title, image, imageAlt } = body;

        if (!title || !image) {
            return NextResponse.json({ message: "Title and image are required" }, { status: 400 });
        }

        const icon = new Icon({ title, image, imageAlt });
        await icon.save();

        return NextResponse.json({ message: "Icon added successfully", data: icon }, { status: 200 });
    } catch (error) {
        console.log("Error saving icon", error);
        return NextResponse.json({ message: "Failed to save icon" }, { status: 500 });
    }
}

export async function PATCH(request: NextRequest) {
    try {
        await connectDB();
        const isAdmin = await verifyAdmin(request);
        if (!isAdmin) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id");

        if (!id) {
            return NextResponse.json({ message: "Icon id is required" }, { status: 400 });
        }

        const body = await request.json();
        const { title, image, imageAlt } = body;

        const icon = await Icon.findById(id);
        if (!icon) {
            return NextResponse.json({ message: "Icon not found" }, { status: 404 });
        }

        icon.title = title;
        icon.image = image;
        icon.imageAlt = imageAlt;
        await icon.save();

        return NextResponse.json({ message: "Icon updated successfully", data: icon }, { status: 200 });
    } catch (error) {
        console.log("Error updating icon", error);
        return NextResponse.json({ message: "Failed to update icon" }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest) {
    try {
        await connectDB();
        const isAdmin = await verifyAdmin(request);
        if (!isAdmin) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id");

        if (!id) {
            return NextResponse.json({ message: "Icon id is required" }, { status: 400 });
        }

        const icon = await Icon.findByIdAndDelete(id);
        if (!icon) {
            return NextResponse.json({ message: "Icon not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Icon deleted successfully" }, { status: 200 });
    } catch (error) {
        console.log("Error deleting icon", error);
        return NextResponse.json({ message: "Failed to delete icon" }, { status: 500 });
    }
}