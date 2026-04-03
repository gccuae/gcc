import mongoose from "mongoose";

const emailsSchema = new mongoose.Schema({
    toEmailCareer: String,
    toEmailVendor: String,
})

const Email = mongoose.models.Email || mongoose.model("Email", emailsSchema);

export default Email;