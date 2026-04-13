import mongoose from "mongoose";

const NewsSchema = new mongoose.Schema({
    banner: {
        type: String,
        required: true,
    },
    bannerAlt: {
        type: String,
    },
    pageTitle: {
        type: String,
        required: true,
    },
    metaTitle: {
        type: String,
    },
    metaDescription: {
        type: String,
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
            type: String
        }
    },
    newsHidden: {
        type: Boolean,
        default: false
    },
    categories: [{
        category: {
            type: String,
        },
        news: [{
            status: {
                type: String,
            },
            title: {
                type: String,
            },
            subTitle: {
                type: String
            },
            description: {
                type: String
            },
            slug: {
                type: String
            },
            content: {
                type: String
            },
            category: {
                type: String
            },
            thumbnail: {
                type: String
            },
            thumbnailAlt: {
                type: String
            },
            metaTitle: {
                type: String
            },
            metaDescription: {
                type: String
            },
            images: [{
                type: String
            }],
            date: {
                type: Date
            },
            createdAt: {
                type: Date,
                default: Date.now
            },
        }],
    }],
});

export default mongoose.models.News || mongoose.model("News", NewsSchema);
