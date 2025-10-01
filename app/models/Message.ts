import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
  metaTitle:{
    type:String
  },
  metaDescription:{
    type:String
  },
  messageSection:{
    items:[{
      title:String,
      image:String,
      imageAlt:String,
      name:String,
      designation:String,
      message:String
    }]
  }
});

const Message = mongoose.models.Message || mongoose.model("Message", MessageSchema);

export default Message;