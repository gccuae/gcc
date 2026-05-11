import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  metaTitle: {
    type: String,
  },
  metaDescription: {
    type: String,
  },
  script: {
    type: String,
  },
  banner: { type: String },
  bannerAlt: { type: String },
  pageTitle: { type: String },
  bannerHidden: {
    type: Boolean,
    default: false
  },
  firstSection: {
    hidden: { type: Boolean, default: false },
    title: { type: String, required: true },
  },
  projectHidden: {
    type: Boolean,
    default: false
  },
  projects: [
    {
      metaTitle: { type: String },
      metaDescription: { type: String },
      script: { type: String },
      banner: { type: String },
      bannerAlt: { type: String },
      thumbnail: { type: String },
      thumbnailAlt: { type: String },
      thumbDescription: { type: String },
      title: { type: String },
      latitude: { type: String },
      longitude: { type: String },
      featuredProject: { type: Boolean },
      bannerHidden: { type: Boolean },
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
        hidden: { type: Boolean, default: false },
        images: [String],
      },
      secondSection: {
        hidden: { type: Boolean, default: false },
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
        hidden: { type: Boolean, default: false },
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
        hidden: { type: Boolean, default: false },
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
        hidden: { type: Boolean, default: false },
        title: { type: String },
        items: [
          {
            title: { type: String },
            description: { type: String },
          },
        ],
      },
      fifthSection: {
        hidden: { type: Boolean, default: false },
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
