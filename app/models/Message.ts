import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
  metaTitle: {
    type: String
  },
  metaDescription: {
    type: String
  },
  firstSection: {
    hidden: {
      type: Boolean,
      default: false
    },
    title: String,
    items: [{
      image: String,
      imageAlt: String,
      name: String,
      designation: String,
    }]
  },
  messageSection: {
    hidden: {
      type: Boolean,
      default: false
    },
    items: [{
      title: String,
      image: String,
      imageAlt: String,
      name: String,
      designation: String,
      message: String
    }]
  }
});

const Message = mongoose.models.Message || mongoose.model("Message", MessageSchema);

export default Message;