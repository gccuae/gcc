import mongoose from "mongoose";

const gallerySchema = new mongoose.Schema({
    metaTitle:{
        type:String,
    },
    metaDescription:{
        type:String,
    },
    pageTitle:{
        type:String,
        required:true
    },
    items:[{
        item: {
            type: String,
        },
        thumbnail: {
            type: String,
        },
        thumbnailAlt: {
            type: String,
        },
        images: [{
            image: {
                type: String,
            },
            imageAlt: {
                type: String,
            },
        }],
    }],
})

export default mongoose.models.Gallery || mongoose.model("Gallery", gallerySchema);