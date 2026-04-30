import mongoose from "mongoose";

const enquirySchema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    email: String,
    contact: String,
    message: String,
  },
  { timestamps: true }
);

export default mongoose.models.Enquiry ||
  mongoose.model("Enquiry", enquirySchema);