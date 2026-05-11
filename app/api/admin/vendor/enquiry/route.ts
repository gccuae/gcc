// import connectDB from "@/lib/mongodb";
// import Vendor from "@/app/models/Vendor";


// export async function GET(req: Request) {
//     await connectDB()
//     const { searchParams } = new URL(req.url);

//     const page = Number(searchParams.get("page")) || 1;
//     const limit = Number(searchParams.get("limit")) || 10;

//     const skip = (page - 1) * limit;

//     const enquiries = await Vendor.find()
//         .skip(skip)
//         .limit(limit)
//         .sort({ _id: -1 })
//         .lean();

//     const total = await Vendor.countDocuments();

//     return Response.json({
//         data: enquiries,
//         totalPages: Math.ceil(total / limit),
//     });
// }


import connectDB from "@/lib/mongodb";
import Vendor from "@/app/models/Vendor";

export async function GET(req: Request) {
    await connectDB();
    const { searchParams } = new URL(req.url);

    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 10;
    const skip = (page - 1) * limit;

    // Exclude the SEO document from enquiries list
    const enquiries = await Vendor.find({ isPageSeo: { $ne: true } })
        .skip(skip)
        .limit(limit)
        .sort({ _id: -1 })
        .lean();

    const total = await Vendor.countDocuments({ isPageSeo: { $ne: true } });

    // Fetch the single SEO document
    const seoData = await Vendor.findOne({ isPageSeo: true }).lean();

    return Response.json({
        data: enquiries,
        totalPages: Math.ceil(total / limit),
        seo: seoData || { metaTitle: "", metaDescription: "", script: "" },
    });
}

export async function PATCH(req: Request) {
    await connectDB();

    const body = await req.json();
    const { metaTitle, metaDescription, script } = body;

    const updated = await Vendor.findOneAndUpdate(
        { isPageSeo: true },
        { metaTitle, metaDescription, script, isPageSeo: true },
        { new: true, upsert: true }
    );

    return Response.json({ message: "SEO updated successfully", data: updated });
}