import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
    metaTitle: {
        type: String,
    },
    metaDescription: {
        type: String,
    },
    banner:{type:String},
    bannerAlt:{type:String},
    pageTitle:{type:String},
    firstSection:{
        title:{type:String,required:true},
    },
    projects:[{
        metaTitle:{type:String},
        metaDescription:{type:String},
        banner:{type:String},
        bannerAlt:{type:String},
        thumbnail:{type:String},
        thumbnailAlt:{type:String},
        title:{type:String},
        latitude:{type:String},
        longitude:{type:String},
        firstSection:{
            images:[String]
        },    
        secondSection:{
            title:{type:String,required:true},
            progress:{type:String,required:true},
            client:{type:String,required:true},
            scopeOfWork:{type:String,required:true},
            completionDate:{type:String,required:true},
            projectValue:{type:String,required:true},
            status:{type:String,required:true},
            projectType:{type:mongoose.Schema.Types.ObjectId,required:true,ref:"ProjectType"},
            sector:{type:mongoose.Schema.Types.ObjectId,required:true,ref:"Sector"},
            location:{type:mongoose.Schema.Types.ObjectId,required:true,ref:"Location"},
        },
        thirdSection:{
            items:[{
                title:{type:String,required:true},
                image:{type:String,required:true},
                imageAlt:{type:String},
                description:{type:String,required:true},
            }]
        },
        forthSection:{
            title:{type:String,required:true},
            items:[{
                title:{type:String,required:true},
                description:{type:String,required:true},
            }]
        },
        slug:{type:String,required:true},
    }],
})

export default mongoose.models.Project || mongoose.model("Project", projectSchema);