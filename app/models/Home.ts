import mongoose from "mongoose";

const homeSchema = new mongoose.Schema({
    metaTitle: {
        type: String,
        required: true
    },
    metaDescription: {
        type: String,
        required: true
    },
    script: {
        type: String,
    },
    expertiseHidden: {
        type: Boolean,
        default: false
    },
    newsHidden: {
        type: Boolean,
        default: false
    },
    bannerSection: {
        hidden: {
            type: Boolean,
            default: false
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
        }]
    },
    numberSection: {
        hidden: {
            type: Boolean,
            default: false
        },
        items: [{
            number: {
                type: String,
                required: true
            },
            value: {
                type: String,
                required: true
            }
        }]
    },
    firstSection: {
        hidden: {
            type: Boolean,
            default: false
        },
        description: {
            type: String,
            required: true
        },
        buttonText: {
            type: String,
            required: true
        },
        video: {
            type: String,
            required: true
        },
        poster: {
            type: String,
            required: true
        },
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
        items: [{
            logo: {
                type: String,
                required: true
            },
            logoAlt: {
                type: String,
            },
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
    fourthSection: {
        hidden: {
            type: Boolean,
            default: false
        },
        title: {
            type: String,
            required: true
        },
        items: [{
            logo: {
                type: String,
                required: true
            },
            logoAlt: {
                type: String,
            },
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
})

export default mongoose.models.Home || mongoose.model("Home", homeSchema);