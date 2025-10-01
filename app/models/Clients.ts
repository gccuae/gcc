import mongoose from "mongoose";

const clientsSchema = new mongoose.Schema({
    banner:{
        type:String,
        required:true
    },
    bannerAlt:{
        type:String,
    },
    metaTitle:{
        type:String,
        required:true
    },
    metaDescription:{
        type:String,
        required:true
    },
    pageTitle:{
        type:String,
        required:true
    },
    firstSection:{
        description:{
            type:String,
            required:true
        },
        items:[{
            logo:{
                type:String,
                required:true
            },
            logoAlt:{
                type:String,
            }
        }]
    },
})

export default mongoose.models.Clients || mongoose.model("Clients", clientsSchema);