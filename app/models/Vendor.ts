import mongoose from "mongoose";

const vendorSchema = new mongoose.Schema(
  {
    vendorName: String,
    tradeLicense: String,
    classification: String,
    website: String,
    services: String,
    expertise: String,
    email: String,
    phone: String,
    address: String,

    icvCertificate: [String],
    companyDocuments: [String],
    additionalAttachments: [String],
  },
  { timestamps: true }
);

export default mongoose.models.Vendor ||
  mongoose.model("Vendor", vendorSchema);