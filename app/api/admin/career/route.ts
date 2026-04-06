import Career from "@/app/models/Career";
import { getToEmail } from "@/helpers/getToEmail";
import { sendMailWithAttachments } from "@/helpers/sendMailWithAttatchments";
import { uploadToDropbox } from "@/lib/connectDropbox";
import connectDB from "@/lib/mongodb";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    await connectDB()
    const formData = await req.formData();

    const firstName = formData.get("firstName");
    const lastName = formData.get("lastName");
    const email = formData.get("email");
    const phone = formData.get("phoneNumber");
    const nationality = formData.get("nationality");
    const currentLocation = formData.get("currentLocation");

    const coverLetter = formData.get("coverLetter") as File | null;
    const resume = formData.get("resume") as File | null;

    let coverLetterUrl = null;
    let resumeUrl = null;
    const files: File[] = [];

    // upload files (example)
    if (coverLetter) {
        const filePath = `/uploads/file/${Date.now()}${coverLetter.name}`;
        coverLetterUrl = await uploadToDropbox(coverLetter, filePath);
        files.push(coverLetter);
    }

    if (resume) {
        const filePath = `/uploads/file/${Date.now()}${resume.name}`;
        resumeUrl = await uploadToDropbox(resume, filePath);
        files.push(resume);
    }

    // save to DB
    await Career.create({
        firstName,
        lastName,
        email,
        phone,
        nationality,
        currentLocation,
        coverLetter: coverLetterUrl,
        resume: resumeUrl,
    });

    const toEmail = await getToEmail("career");

    const attachments = await buildAttachments(files);

    await sendMailWithAttachments({
        type: "career",
        to: toEmail,
        subject: `Website Form – Careers`,
        fields: {
            firstName,
            lastName,
            email,
            phone,
            nationality,
            currentLocation,
            coverLetter,
            resume
        },
        attachments,
    });

    return Response.json({ success: true });
}


async function buildAttachments(files: File[]) {
    return Promise.all(
        files.map(async (file) => ({
            filename: file.name,
            content: Buffer.from(await file.arrayBuffer()),
            contentType: file.type,
        }))
    );
}


export async function GET(req: Request) {
    await connectDB()
    const { searchParams } = new URL(req.url);

    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 10;

    const skip = (page - 1) * limit;

    const enquiries = await Career.find()
        .skip(skip)
        .limit(limit)
        .sort({ _id: -1 })
        .lean();

    const total = await Career.countDocuments();

    return Response.json({
        data: enquiries,
        totalPages: Math.ceil(total / limit),
    });
}