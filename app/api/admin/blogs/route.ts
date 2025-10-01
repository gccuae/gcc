import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Blogs from "@/app/models/Blogs";
import { verifyAdmin } from "@/lib/verifyAdmin";


export async function GET(req: NextRequest) {
    try {
        await connectDB();
        const searchParams = req.nextUrl.searchParams;
        const id = searchParams.get("id");
        const blogs = await Blogs.findOne({});
        if (!blogs) {
            return NextResponse.json({ message: "Blogs not found" }, { status: 404 });
        }
        if(id){
            const blogsCategory = await blogs.categories.flatMap((category:  { blogs: { _id: string }[] }) => category.blogs.find((blogs: { _id: string }) => blogs._id == id));
            if (!blogsCategory) {
                return NextResponse.json({ message: "Blogs Category not found" }, { status: 404 });
            }
            return NextResponse.json({data:blogsCategory,message:"Blogs fetched successfully"}, { status: 200 });
        }
        return NextResponse.json({data:blogs,message:"Blogs fetched successfully"}, { status: 200 });
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
        const id = request.nextUrl.searchParams.get("id");
        await connectDB();

        if (id) {
            const blogs = await Blogs.findOne({});
            if (!blogs) {
                return NextResponse.json({ message: "Blogs not found" }, { status: 404 });
            }

            let updated = false;

            // loop through categories and blogs items
            for (const category of blogs.categories) {
                const blogsItem = category.blogs.find((n: { _id: string }) => n._id.toString() === id);
                if (blogsItem) {
                    // update only provided fields
                    Object.assign(blogsItem, body);
                    updated = true;
                    break;
                }
            }

            if (!updated) {
                return NextResponse.json({ message: "Blogs item not found" }, { status: 404 });
            }

            await blogs.save();
            return NextResponse.json({ data: blogs, message: "Blogs updated successfully" }, { status: 200 });
        }
        const blogs = await Blogs.findOneAndUpdate({}, body,{upsert:true,new:true});
        if (!blogs) {
            return NextResponse.json({ message: "Blogs not found" }, { status: 404 });
        }
        return NextResponse.json({data:blogs,message:"Blogs updated successfully"}, { status: 200 });
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
        const blogs = await Blogs.findOne({});
        if (!blogs) {
            return NextResponse.json({ message: "Blogs not found" }, { status: 404 });
        }
        const blogsCategory = await blogs.categories.find((category: { category: string }) => category.category === body.category);
        if (!blogsCategory) {
            return NextResponse.json({ message: "Blogs Category not found" }, { status: 404 });
        }
        blogsCategory.blogs.push(body);
        await blogs.save();
        return NextResponse.json({message:"Blogs created successfully"}, { status: 200 });
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

        const id = request.nextUrl.searchParams.get("id"); // news _id
        await connectDB();

        const blogs = await Blogs.findOne({});
        if (!blogs) {
            return NextResponse.json({ message: "Blogs not found" }, { status: 404 });
        }

        let deleted = false;

        // loop through categories
        for (const category of blogs.categories) {
            const index = category.blogs.findIndex((n: { _id: string }) => n._id.toString() === id);
            if (index !== -1) {
                category.blogs.splice(index, 1); // remove the news item
                deleted = true;
                break;
            }
        }

        if (!deleted) {
            return NextResponse.json({ message: "Blogs item not found" }, { status: 404 });
        }

        await blogs.save();
        return NextResponse.json({ message: "Blogs deleted successfully" }, { status: 200 });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}


