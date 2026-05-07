import { NextRequest, NextResponse } from "next/server";
import News from "@/app/models/News";
import connectDB from "@/lib/mongodb";
import mongoose from "mongoose";

export async function POST(req: NextRequest) {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    await connectDB();

    const { categoryId, orderedNewsIds } = await req.json();
    // orderedNewsIds: string[] — the news _id's in new order

    const doc = await News.findOne({}).session(session);
    if (!doc) throw new Error("News document not found");

    const category = doc.categories.id(categoryId);
    if (!category) throw new Error("Category not found");

    // Reorder news array based on orderedNewsIds, preserving all data
    const newsMap = new Map(
      category.news.map((n: { _id: mongoose.Types.ObjectId }) => [n._id.toString(), n])
    );
    const reordered = orderedNewsIds
      .map((id: string) => newsMap.get(id))
      .filter(Boolean);

    // Safety check — don't save if counts don't match (prevents data loss)
    if (reordered.length !== category.news.length) {
      throw new Error("Reorder mismatch — aborting to prevent data loss");
    }

    category.news = reordered;
    await doc.save({ session });
    await session.commitTransaction();

    return NextResponse.json({ message: "Reordered successfully", success: true });
  } catch (error) {
    await session.abortTransaction();
    console.error(error);
    return NextResponse.json({ message: "Internal Server Error", success: false }, { status: 500 });
  } finally {
    session.endSession();
  }
}