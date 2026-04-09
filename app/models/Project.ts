import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  metaTitle: {
    type: String,
  },
  metaDescription: {
    type: String,
  },
  banner: { type: String },
  bannerAlt: { type: String },
  pageTitle: { type: String },
  firstSection: {
    title: { type: String, required: true },
  },
  projects: [
    {
      metaTitle: { type: String },
      metaDescription: { type: String },
      banner: { type: String },
      bannerAlt: { type: String },
      thumbnail: { type: String },
      thumbnailAlt: { type: String },
      thumbDescription: { type: String },
      title: { type: String },
      latitude: { type: String },
      longitude: { type: String },
      featuredProject: { type: Boolean },
      status: {
        type: String,
        enum: ["draft", "published"],
        default: "draft",
      },
      relatedService: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Expertise",
      },
      firstSection: {
        images: [String],
      },
      secondSection: {
        title: { type: String },
        progress: { type: String },
        client: { type: String },
        scopeOfWork: { type: String },
        completionDate: { type: String },
        projectValue: { type: String },
        superficie: { type: String },
        status: { type: String },
        projectType: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "ProjectType",
        },
        sector: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Sector",
          default: null,
        },
        location: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Location",
        },
        fullLocation: { type: String },
      },
      numberSection: {
        items: [{
          number: {
            type: String,
            required: true
          },
          value: {
            type: String,
            required: true
          },
          image: {
            type: String,
            required: true
          },
          imageAlt: {
            type: String,
          }
        }]
      },
      thirdSection: {
        items: [
          {
            title: { type: String },
            image: { type: String },
            imageAlt: { type: String },
            description: { type: String },
          },
        ],
      },
      forthSection: {
        title: { type: String },
        items: [
          {
            title: { type: String },
            description: { type: String },
          },
        ],
      },
      fifthSection: {
        title: { type: String },
        description: { type: String },
        buttonTitle: { type: String },
        buttonLink: { type: String },
        map: { type: String },
      },
      slug: { type: String, required: true },
    },
  ],
});

export default mongoose.models.Project ||
  mongoose.model("Project", projectSchema);
