import mongoose from "mongoose";

const careerSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    nationality: { type: String, required: true },
    currentLocation: { type: String, required: true },
    position: { type: String, required: true },
    coverLetter: { type: String },
    resume: { type: String, required: true },
})

export default mongoose.models.Career || mongoose.model("Career", careerSchema);