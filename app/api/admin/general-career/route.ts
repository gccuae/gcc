import GeneralCareer from "@/app/models/GeneralCareer";
import { getToEmail } from "@/helpers/getToEmail";
import { sendMailWithAttachments } from "@/helpers/sendMailWithAttatchments";
import { uploadToDropbox } from "@/lib/connectDropbox";
import connectDB from "@/lib/mongodb";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  await connectDB();
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

  if (coverLetter && coverLetter.size > 0) {
    const filePath = `/uploads/general-career/${Date.now()}${coverLetter.name}`;
    coverLetterUrl = await uploadToDropbox(coverLetter, filePath);
    files.push(coverLetter);
  }

  if (resume && resume.size > 0) {
    const filePath = `/uploads/general-career/${Date.now()}${resume.name}`;
    resumeUrl = await uploadToDropbox(resume, filePath);
    files.push(resume);
  }

  await GeneralCareer.create({
    firstName,
    lastName,
    email,
    phone,
    nationality,
    currentLocation,
    coverLetter: coverLetterUrl,
    resume: resumeUrl,
  });

  const toEmail = await getToEmail("careerGeneral");

  const attachments = await buildAttachments(files);

  await sendMailWithAttachments({
    type: "career",
    to: toEmail,
    subject: `Website Form – General Career Application`,
    fields: {
      firstName,
      lastName,
      email,
      phone,
      nationality,
      currentLocation,
      coverLetter,
      resume,
    },
    attachments,
  });

  return Response.json({ success: true });
}

export async function GET(req: Request) {
  await connectDB();
  const { searchParams } = new URL(req.url);

  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 10;
  const skip = (page - 1) * limit;

  const enquiries = await GeneralCareer.find()
    .skip(skip)
    .limit(limit)
    .sort({ _id: -1 })
    .lean();

  const total = await GeneralCareer.countDocuments();

  return Response.json({
    data: enquiries,
    totalPages: Math.ceil(total / limit),
  });
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