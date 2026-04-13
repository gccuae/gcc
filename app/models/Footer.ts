import mongoose from "mongoose";

const footerSchema = new mongoose.Schema({
    metaTitle: {
        type: String,
        required: true
    },
    metaDescription: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["draft", "published"],
        default: "published",
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
    },
    secondSection: {
        hidden: {
            type: Boolean,
            default: false
        },
        address: {
            type: String,
            required: true
        },
        map: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true
        },
    },
    thirdSection: {
        hidden: {
            type: Boolean,
            default: false
        },
        title: {
            type: String,
            required: true
        },
        items: [{
            title: {
                type: String,
                required: true
            },
            link: {
                type: String,
                required: true
            }
        }]
    },
    forthSection: {
        hidden: {
            type: Boolean,
            default: false
        },
        items: [{
            title: {
                type: String,
                required: true
            },
            link: {
                type: String,
                required: true
            }
        }]
    },
    fifthSection: {
        hidden: {
            type: Boolean,
            default: false
        },
        title: {
            type: String,
            required: true
        },
        file: {
            type: String,
            required: true
        },
        buttonText: {
            type: String,
            required: true
        },
    },
})

export default mongoose.models.Footer || mongoose.model("Footer", footerSchema);