import connectDB from "@/lib/mongodb";
import Enquiry from "@/app/models/Enquiry";
import { NextResponse } from "next/server";
import { getToEmail } from "@/helpers/getToEmail";
import { sendMailWithAttachments } from "@/helpers/sendMailWithAttatchments";

export async function GET(req: Request) {
  await connectDB();
  const { searchParams } = new URL(req.url);

  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 10;

  const skip = (page - 1) * limit;

  const enquiries = await Enquiry.find()
    .skip(skip)
    .limit(limit)
    .sort({ _id: -1 })
    .lean();

  const total = await Enquiry.countDocuments();

  return Response.json({
    data: enquiries,
    totalPages: Math.ceil(total / limit),
  });
}

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();
    const { firstName, lastName, email, contact, message } = body;

    await Enquiry.create({ firstName, lastName, email, contact, message });

    const toEmail = await getToEmail("contact");

    await sendMailWithAttachments({
      type: "contact",
      to: toEmail,
      subject: "Website Form – Contact Enquiry",
      fields: { firstName, lastName, email, contact, message },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Failed to submit form" },
      { status: 500 },
    );
  }
}
