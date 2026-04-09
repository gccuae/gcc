import mongoose from "mongoose";

const BlogsSchema = new mongoose.Schema({
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
    categories: [{
        category: {
            type: String,
        },
        blogs: [{
            status: {
                type: String
            },
            title: {
                type: String,
            },
            author: {
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
            coverPhoto: {
                type: String
            },
            coverPhotoAlt: {
                type: String
            },
            quote: {
                type: String
            },
            quoteAuthor: {
                type: String
            },
            metaTitle: {
                type: String
            },
            metaDescription: {
                type: String
            },
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

export default mongoose.models.Blogs || mongoose.model("Blogs", BlogsSchema);
