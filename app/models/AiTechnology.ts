import mongoose from "mongoose";

const aboutSchema = new mongoose.Schema({
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
    script: {
        type: String,
    },
    pageTitle: {
        type: String,
        required: true
    },
    bannerHidden: {
        type: Boolean,
        default: false
    },
    firstSection: {
        hidden: {
            type: Boolean,
            default: false
        },
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        image: {
            type: String,
            required: true
        },
        imageAlt: {
            type: String,
        },
    },
    secondSection: {
        hidden: {
            type: Boolean,
            default: false
        },
        items: [{
            image: {
                type: String,
                required: true
            },
            imageAlt: {
                type: String,
            },
            mainTitle: {
                type: String,
                required: true
            },
            subTitle: {
                type: String,
                required: true
            },
            description: {
                type: String,
                required: true
            }
        }]
    },
    thirdSection: {
        hidden: {
            type: Boolean,
            default: false
        },
        primaryColourText: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        buttonText: {
            type: String,
            required: true
        }
    },
})

export default mongoose.models.AiTechnology || mongoose.model("AiTechnology", aboutSchema);