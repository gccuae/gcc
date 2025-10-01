import mongoose from "mongoose";

const teamSchema = new mongoose.Schema({
    metaTitle:{
        type:String,
    },
    metaDescription:{
        type:String,
    },
    firstSection:{
        title:{
            type:String,
        },
        items:[{
            image:{
                type:String,
            },
            imageAlt:{
                type:String,
            },
            name:{
                type:String,
            },
            designation:{
                type:String,
            }
        }]
    },
    categories:[{
        category: {
            type: String,
        },
    }],
    secondSection:{
        title:{
            type:String,
        },
        items:[{
            image:{
                type:String,
            },
            imageAlt:{
                type:String,
            },
            name:{
                type:String,
            },
            designation:{
                type:String,
            },
            category:{
                type:String,
            }
        }]
    },
})

export default mongoose.models.Team || mongoose.model("Team", teamSchema);