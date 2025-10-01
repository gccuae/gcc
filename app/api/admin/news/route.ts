import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import News from "@/app/models/News";
import { verifyAdmin } from "@/lib/verifyAdmin";


export async function GET(req: NextRequest) {
    try {
        await connectDB();
        const searchParams = req.nextUrl.searchParams;
        const id = searchParams.get("id");
        const news = await News.findOne({});
        if (!news) {
            return NextResponse.json({ message: "News not found" }, { status: 404 });
        }
        if(id){
            const newsCategory = await news.categories.flatMap((category:  { news: { _id: string }[] }) => category.news.find((news: { _id: string }) => news._id == id));
            if (!newsCategory) {
                return NextResponse.json({ message: "News Category not found" }, { status: 404 });
            }
            return NextResponse.json({data:newsCategory,message:"News fetched successfully"}, { status: 200 });
        }
        return NextResponse.json({data:news,message:"News fetched successfully"}, { status: 200 });
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
            const news = await News.findOne({});
            if (!news) {
                return NextResponse.json({ message: "News not found" }, { status: 404 });
            }

            let updated = false;

            // loop through categories and news items
            for (const category of news.categories) {
                const newsItem = category.news.find((n: { _id: string }) => n._id.toString() === id);
                if (newsItem) {
                    // update only provided fields
                    Object.assign(newsItem, body);
                    updated = true;
                    break;
                }
            }

            if (!updated) {
                return NextResponse.json({ message: "News item not found" }, { status: 404 });
            }

            await news.save();
            return NextResponse.json({ data: news, message: "News updated successfully" }, { status: 200 });
        }
        const news = await News.findOneAndUpdate({}, body,{upsert:true,new:true});
        if (!news) {
            return NextResponse.json({ message: "News not found" }, { status: 404 });
        }
        return NextResponse.json({data:news,message:"News updated successfully"}, { status: 200 });
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
        const news = await News.findOne({});
        if (!news) {
            return NextResponse.json({ message: "News not found" }, { status: 404 });
        }
        const newsCategory = await news.categories.find((category: { category: string }) => category.category === body.category);
        if (!newsCategory) {
            return NextResponse.json({ message: "News Category not found" }, { status: 404 });
        }
        newsCategory.news.push(body);
        await news.save();
        return NextResponse.json({message:"News created successfully"}, { status: 200 });
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

        const news = await News.findOne({});
        if (!news) {
            return NextResponse.json({ message: "News not found" }, { status: 404 });
        }

        let deleted = false;

        // loop through categories
        for (const category of news.categories) {
            const index = category.news.findIndex((n: { _id: string }) => n._id.toString() === id);
            if (index !== -1) {
                category.news.splice(index, 1); // remove the news item
                deleted = true;
                break;
            }
        }

        if (!deleted) {
            return NextResponse.json({ message: "News item not found" }, { status: 404 });
        }

        await news.save();
        return NextResponse.json({ message: "News deleted successfully" }, { status: 200 });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}


