import mongoose, { Schema, models, model } from "mongoose";

const IconSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
        imageAlt: {
            type: String,
            default: "",
        },
    },
    { timestamps: true }
);

const Icon = models.Icon || model("Icon", IconSchema);

export default Icon;