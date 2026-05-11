import mongoose from "mongoose";

const awardsSchema = new mongoose.Schema({
    metaTitle:{
        type:String,
    },
    metaDescription:{
        type:String,
    },
    script:{
        type:String,
    },
    pageTitle:{
        type:String,
        required:true
    },
    categories:[{
        category: {
            type: String,
        },
        files: [{
            mainTitle: {
                type: String,
            },
            subTitle: {
                type: String,
            },
            file: {
                type: String,
            },
            thumbnail: {
                type: String,
            },
            thumbnailAlt: {
                type: String,
            },
        }],
    }],
})

export default mongoose.models.Awards || mongoose.model("Awards", awardsSchema);