import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Project from "@/app/models/Project";
import News from "@/app/models/News";
import Expertise from "@/app/models/Expertise";

export async function POST(req: NextRequest) {
  const { searchQuery } = await req.json();
  await connectDB();

  // --- PROJECTS ---
  const projectResults = await Project.aggregate([
    {
      $search: {
        index: "default", // Atlas Search index name
        compound: {
          should: [
            {
              text: {
                query: searchQuery,
                path: [
                  "projects.title",
                  "projects.description",
                  "projects.secondSection.location.name",
                  "projects.secondSection.sector.name",
                  "projects.secondSection.projectType.name",
                ],
                fuzzy: { maxEdits: 2, prefixLength: 0 },
              },
            },
          ],
        },
      },
    },
    { $unwind: "$projects" },
    {
      $lookup: {
        from: "locations",
        localField: "projects.secondSection.location",
        foreignField: "_id",
        as: "projects.location",
      },
    },
    { $unwind: { path: "$projects.location", preserveNullAndEmptyArrays: true } },
    {
      $lookup: {
        from: "sectors",
        localField: "projects.secondSection.sector",
        foreignField: "_id",
        as: "projects.sector",
      },
    },
    { $unwind: { path: "$projects.sector", preserveNullAndEmptyArrays: true } },
    {
      $lookup: {
        from: "projecttypes",
        localField: "projects.secondSection.projectType",
        foreignField: "_id",
        as: "projects.projectType",
      },
    },
    { $unwind: { path: "$projects.projectType", preserveNullAndEmptyArrays: true } },
    {
      $project: {
        _id: 0,
        type: { $literal: "project" },
        item: "$projects",
      },
    },
  ]);

  // --- EXPERTISE ---
  const expertiseResults = await Expertise.aggregate([
    {
      $search: {
        index: "default",
        compound: {
          should: [
            {
              text: {
                query: searchQuery,
                path: [
                  "secondSection.items.title",
                  "secondSection.items.description",
                  "secondSection.items.slug",
                ],
                fuzzy: { maxEdits: 2, prefixLength: 0 },
              },
            },
          ],
        },
      },
    },
    { $unwind: "$secondSection.items" },
    {
      $project: {
        _id: 0,
        type: { $literal: "expertise" },
        item: "$secondSection.items",
      },
    },
  ]);

  // --- NEWS ---
  const newsResults = await News.aggregate([
    {
      $search: {
        index: "default",
        compound: {
          should: [
            {
              text: {
                query: searchQuery,
                path: [
                  "categories.news.title",
                  "categories.news.subTitle",
                  "categories.news.description",
                  "categories.news.content",
                  "categories.news.slug",
                  "categories.news.category",
                ],
                fuzzy: { maxEdits: 2, prefixLength: 0 },
              },
            },
          ],
        },
      },
    },
    { $unwind: "$categories" },
    { $unwind: "$categories.news" },
    {
      $project: {
        _id: 0,
        type: { $literal: "news" },
        item: "$categories.news",
      },
    },
  ]);

  // --- COMBINE RESULTS ---
  const combined = [...projectResults, ...expertiseResults, ...newsResults];

  console.log("Combined results count:", combined.length);
  return NextResponse.json({ success: true, data: combined });
}
