import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Expertise from "@/app/models/Expertise";
import { verifyAdmin } from "@/lib/verifyAdmin";

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const id = request.nextUrl.searchParams.get("id");
    const slug = request.nextUrl.searchParams.get("slug");
    const expertise = await Expertise.findOne({});
    if (id) {
      const itemToUpdate = expertise.secondSection.items.find(
        (item: { id: string }) => item.id == id
      );
      if (itemToUpdate) {
        return NextResponse.json(
          { data: itemToUpdate, message: "Expertise fetched successfully" },
          { status: 200 }
        );
      }
    } else if (slug) {
      const itemToUpdate = expertise.secondSection.items.find(
        (item: { slug: string }) => item.slug == slug
      );
      if (itemToUpdate) {
        return NextResponse.json(
          { data: itemToUpdate, message: "Expertise fetched successfully" },
          { status: 200 }
        );
      }
    } else {
      if (!expertise) {
        return NextResponse.json(
          { message: "Expertise not found" },
          { status: 404 }
        );
      }
      return NextResponse.json(
        { data: expertise, message: "Expertise fetched successfully" },
        { status: 200 }
      );
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
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
    if (id) {
      const expertise = await Expertise.findOne({});
      if (expertise) {
        const itemToUpdate = expertise.secondSection.items.find(
          (item: { _id: string }) => item._id.toString() == id
        );
        if (itemToUpdate) {
          console.log(itemToUpdate.secondSection.items);
          itemToUpdate.firstSection = body.firstSection;
          itemToUpdate.secondSection = body.secondSection;
          itemToUpdate.thirdSection = body.thirdSection;
          await expertise.save();
          return NextResponse.json(
            { message: "Expertise updated successfully" },
            { status: 200 }
          );
        }
      }
      return NextResponse.json(
        { message: "Expertise updating failed" },
        { status: 400 }
      );
    } else {
      const expertise = await Expertise.findOneAndUpdate({}, body, {
        upsert: true,
        new: true,
      });
      if (!expertise) {
        return NextResponse.json(
          { message: "Expertise not found" },
          { status: 404 }
        );
      }
      return NextResponse.json(
        { message: "Expertise updated successfully" },
        { status: 200 }
      );
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
