import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Project from "@/app/models/Project";
import News from "@/app/models/News";
import Expertise from "@/app/models/Expertise";
import About from "@/app/models/About";
import GroupCompany from "@/app/models/GroupCompany";
import Qhse from "@/app/models/Qhse";
import Awards from "@/app/models/Awards";
import Sustainability from "@/app/models/Sustainability";
import AiTechnology from "@/app/models/AiTechnology";
import Blogs from "@/app/models/Blogs";
import Gallery from "@/app/models/Gallery";
import Openings from "@/app/models/Openings";
import Contact from "@/app/models/Contact";

export async function POST(req: NextRequest) {
  const { searchQuery } = await req.json();
  await connectDB();

  // --- PROJECTS ---
  const projectResults = await Project.aggregate([
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
      $match: {
        $or: [
          { "projects.title": { $regex: searchQuery, $options: "i" } },
          { "projects.description": { $regex: searchQuery, $options: "i" } },
          { "projects.location.name": { $regex: searchQuery, $options: "i" } },
          { "projects.sector.name": { $regex: searchQuery, $options: "i" } },
          { "projects.projectType.name": { $regex: searchQuery, $options: "i" } },
        ]
      }
    },
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
    { $unwind: "$secondSection.items" },
    {
      $match: {
        $or: [
          { "secondSection.items.title": { $regex: searchQuery, $options: "i" } },
          { "secondSection.items.description": { $regex: searchQuery, $options: "i" } },
        ]
      }
    },
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
    { $unwind: "$categories" },
    { $unwind: "$categories.news" },
    {
      $match: {
        $or: [
          { "categories.news.title": { $regex: searchQuery, $options: "i" } },
          { "categories.news.subTitle": { $regex: searchQuery, $options: "i" } },
          { "categories.news.description": { $regex: searchQuery, $options: "i" } },
          { "categories.news.content": { $regex: searchQuery, $options: "i" } },
          { "categories.news.category": { $regex: searchQuery, $options: "i" } },
        ]
      }
    },
    {
      $project: {
        _id: 0,
        type: { $literal: "news" },
        item: "$categories.news",
      },
    },
  ]);

  const aboutResults = await About.find({
    $or: [
      { "pageTitle": { $regex: searchQuery, $options: "i" } },
      { "firstSection.title": { $regex: searchQuery, $options: "i" } },
      { "firstSection.description": { $regex: searchQuery, $options: "i" } },
      { "secondSection.mainTitle": { $regex: searchQuery, $options: "i" } },
      { "secondSection.items.title": { $regex: searchQuery, $options: "i" } },
      { "thirdSection.mainTitle": { $regex: searchQuery, $options: "i" } },
      { "thirdSection.items.title": { $regex: searchQuery, $options: "i" } },
      { "historySection.items.mainTitle": { $regex: searchQuery, $options: "i" } },
      { "fifthSection.items.title": { $regex: searchQuery, $options: "i" } },
    ],
  }).lean();

  const formattedAbout = aboutResults.map((item) => ({
    type: "about",
    item,
  }));


  const expertiseResultsListing = await Expertise.find({
    $or: [
      { "pageTitle": { $regex: searchQuery, $options: "i" } },
      { "firstSection.title": { $regex: searchQuery, $options: "i" } },
      { "firstSection.description": { $regex: searchQuery, $options: "i" } },
      { "secondSection.items.title": { $regex: searchQuery, $options: "i" } },
    ],
  }).lean();

  const formattedExpertiseListing = expertiseResultsListing.map((item) => ({
    type: "expertise-listing",
    item,
  }));


  const groupCompanies = await GroupCompany.find({
    $or: [
      { "pageTitle": { $regex: searchQuery, $options: "i" } },
      { "firstSection.title": { $regex: searchQuery, $options: "i" } },
      { "firstSection.description": { $regex: searchQuery, $options: "i" } },
      { "secondSection.items.title": { $regex: searchQuery, $options: "i" } },
    ],
  }).lean();

  const groupCompaniesListing = groupCompanies.map((item) => ({
    type: "group-company",
    item,
  }));

  const qhse = await Qhse.find({
    $or: [
      { "firstSection.mainTitle": { $regex: searchQuery, $options: "i" } },
      { "firstSection.description": { $regex: searchQuery, $options: "i" } },
      { "fourthSection.items.title": { $regex: searchQuery, $options: "i" } },
    ],
  }).lean();

  const qhseListing = qhse.map((item) => ({
    type: "qhse",
    item,
  }));

  const awards = await Awards.find({
    $or: [
      { "categories.files.mainTitle": { $regex: searchQuery, $options: "i" } },
      { "pageTitle": { $regex: searchQuery, $options: "i" } },
    ],
  }).lean();

  const awardsListing = awards.map((item) => ({
    type: "qhse",
    item,
  }));


  const sustainability = await Sustainability.find({
    $or: [
      { "fourthSection.items.title": { $regex: searchQuery, $options: "i" } },
      { "pageTitle": { $regex: searchQuery, $options: "i" } },
    ],
  }).lean();

  const sustainabilityListing = sustainability.map((item) => ({
    type: "sustainability",
    item,
  }));


  const aiTechnology = await AiTechnology.find({
    $or: [
      { "fourthSection.items.title": { $regex: searchQuery, $options: "i" } },
      { "pageTitle": { $regex: searchQuery, $options: "i" } },
    ],
  }).lean();

  const aiTechnologyListing = aiTechnology.map((item) => ({
    type: "aiTechnology",
    item,
  }));

  const blogs = await Blogs.find({
    $or: [
      { "categories.blogs.title": { $regex: searchQuery, $options: "i" } },
      { "pageTitle": { $regex: searchQuery, $options: "i" } },
    ],
  }).lean();

  const blogsListing = blogs.map((item) => ({
    type: "blogs",
    item,
  }));

  const blogsIndi = await Blogs.find({
    $or: [
      { "categories.blogs.title": { $regex: searchQuery, $options: "i" } },
    ],
  }).lean();

  const blogsIndiListing = blogsIndi.flatMap((doc) =>
    doc.categories.flatMap((cat: { blogs: { title: string, slug: string }[] }) =>
      cat.blogs
        .filter((blog) =>
          blog.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .map((blog: { slug: string, title: string }) => ({
          type: "blogs-indi",
          slug: blog.slug, // ✅ THIS is what you want
          title: blog.title,
        }))
    )
  );

  const gallery = await Gallery.find({
    $or: [
      { "items.item": { $regex: searchQuery, $options: "i" } },
      { "pageTitle": { $regex: searchQuery, $options: "i" } },
    ],
  }).lean();

  const galleryListing = gallery.map((item) => ({
    type: "gallery",
    item,
  }));

  const currentOpenings = await Openings.find({
    $or: [
      { "secondSection.mainTitle": { $regex: searchQuery, $options: "i" } },
      { "openings.firstSection.jobTitle": { $regex: searchQuery, $options: "i" } },
      { "openings.firstSection.department": { $regex: searchQuery, $options: "i" } },
      { "openings.firstSection.location": { $regex: searchQuery, $options: "i" } },
    ],
  }).lean();

  const currentOpeningsListing = currentOpenings.map((item) => ({
    type: "currentOpenings",
    item,
  }));


  const contact = await Contact.find({
    $or: [
      { "secondSection.addressTitle": { $regex: searchQuery, $options: "i" } },
      { "secondSection.location": { $regex: searchQuery, $options: "i" } },
    ],
  }).lean();

  const contactListing = contact.map((item) => ({
    type: "contact",
    item,
  }));

  const staticResults = [];

  const query = searchQuery.toLowerCase();

  if (query.includes("vendor")) {
    staticResults.push({
      type: "vendor",
      title: "Vendor Registration",
      slug: "vendor-registration",
    });
  }

  // --- COMBINE RESULTS ---
  const combined = [
    ...staticResults,
    ...projectResults,
    ...expertiseResults,
    ...newsResults,
    ...formattedAbout,
    ...groupCompaniesListing,
    ...formattedExpertiseListing,
    ...qhseListing,
    ...awardsListing,
    ...sustainabilityListing,
    ...aiTechnologyListing,
    ...blogsListing,
    ...blogsIndiListing,
    ...galleryListing,
    ...currentOpeningsListing,
    ...contactListing
  ];

  console.log("Combined results count:", combined.length);
  return NextResponse.json({ success: true, data: combined });
}
