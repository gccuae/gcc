import mongoose from "mongoose";

const generalCareerSchema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    nationality: String,
    currentLocation: String,
    coverLetter: String,
    resume: String,
  },
  { timestamps: true }
);

const GeneralCareer =
  mongoose.models.GeneralCareer ||
  mongoose.model("GeneralCareer", generalCareerSchema);

export default GeneralCareer;