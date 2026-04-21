import mongoose from "mongoose";

const socialMediaSchema = new mongoose.Schema({
    socialSection: {
        hidden: {
            type: Boolean,
            default: false
        },
        items: [
            {
                hidden: {
                    type: Boolean,
                    default: false
                },
                title: {
                    type: String,
                    required: true
                },
                link: {
                    type: String,
                },
                image: {
                    type: String,
                },
                imageAlt: {
                    type: String,
                },
            }
        ]
    }
});

export default mongoose.models.SocialMedia || mongoose.model("SocialMedia", socialMediaSchema);
