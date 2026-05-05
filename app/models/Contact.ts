import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
    banner: {
        type: String,
        required: true
    },
    bannerAlt: {
        type: String,
    },
    metaTitle: {
        type: String,
        required: true
    },
    metaDescription: {
        type: String,
        required: true
    },
    pageTitle: {
        type: String,
        required: true
    },
    firstSection: {
        hidden: { type: Boolean, default: false },
        pageTitle: {
            type: String,
            required: true
        },
        mainTitle: {
            type: String,
            required: true
        },
        subTitle: {
            type: String,
            required: true
        }
    },
    secondSection: {
        hidden: { type: Boolean, default: false },
        mainTitle: {
            type: String,
            required: true
        },
        subTitle: {
            type: String,
            required: true
        },
        addressTitle: {
            type: String,
            required: true
        },
        location: {
            type: String,
            required: true
        },
        telephone: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        fax: {
            type: String,
            required: true
        },
        timings: {
            type: String,
            required: true
        },
        map: {
            type: String,
            required: true
        },
        getDirection: {
            type: String,
        }
    },
})

export default mongoose.models.Contact || mongoose.model("Contact", contactSchema);