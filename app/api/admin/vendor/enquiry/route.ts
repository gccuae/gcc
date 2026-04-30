import connectDB from "@/lib/mongodb";
import Vendor from "@/app/models/Vendor";


export async function GET(req: Request) {
    await connectDB()
    const { searchParams } = new URL(req.url);

    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 10;

    const skip = (page - 1) * limit;

    const enquiries = await Vendor.find()
        .skip(skip)
        .limit(limit)
        .sort({ _id: -1 })
        .lean();

    const total = await Vendor.countDocuments();

    return Response.json({
        data: enquiries,
        totalPages: Math.ceil(total / limit),
    });
}