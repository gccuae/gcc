import mongoose from "mongoose";

const qhseSchema = new mongoose.Schema({
    metaTitle: {
        type: String,
        required: true
    },
    metaDescription: {
        type: String,
        required: true
    },
    firstSection: {
        hidden: {
            type: Boolean,
            default: false
        },
        mainTitle: {
            type: String,
            required: true
        },
        subTitle: {
            type: String,
            required: true
        },
        primaryColorText: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        }
    },
    secondSection: {
        hidden: {
            type: Boolean,
            default: false
        },
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        image: {
            type: String,
            required: true
        },
        imageAlt: {
            type: String,
        },
        items: [{
            image: {
                type: String,
                required: true
            },
            imageAlt: {
                type: String,
            },
            title: {
                type: String,
                required: true
            }
        }]
    },
    thirdSection: {
        hidden: {
            type: Boolean,
            default: false
        },
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        items: [{
            image: {
                type: String,
                required: true
            },
            imageAlt: {
                type: String,
            },
            title: {
                type: String,
                required: true
            }
        }]
    },
    forthSection: {
        hidden: {
            type: Boolean,
            default: false
        },
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        items: [{
            thumbnail: {
                type: String,
                required: true
            },
            thumbnailAlt: {
                type: String,
            },
            title: {
                type: String,
                required: true
            },
            images: [{
                image: {
                    type: String,
                    required: true
                },
                imageAlt: {
                    type: String,
                }
            }]
        }]
    },
    fifthSection: {
        hidden: {
            type: Boolean,
            default: false
        },
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        items: [{
            image: {
                type: String,
                required: true
            },
            imageAlt: {
                type: String,
            },
            title: {
                type: String,
                required: true
            },
            description: {
                type: String,
                required: true
            }
        }],
    },
    certificateHidden: {
        type: Boolean,
        default: false
    }
})

export default mongoose.models.Qhse || mongoose.model("Qhse", qhseSchema);