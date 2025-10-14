import mongoose from "mongoose";

const aboutSchema = new mongoose.Schema({
    banner: {
        type: String,
        required: true
    },
    bannerAlt: {
        type: String,
    },
    metaTitle: {
        type: String,
        required: true
    },
    metaDescription: {
        type: String,
        required: true
    },
    pageTitle: {
        type: String,
        required: true
    },
    firstSection: {
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
    },
    secondSection: {
        mainTitle: {
            type: String,
            required: true
        },
        subTitle: {
            type: String,
            required: true
        },
        firstDescription: {
            type: String,
            required: true
        },
        secondDescription: {
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
    thirdSection: {
        mainTitle: {
            type: String,
            required: true
        },
        subTitle: {
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
    historySection: {
        title: {
            type: String,
            required: true
        },
        items: [{
            year: {
                type: String,
                required: true
            },
            mainTitle: {
                type: String,
                required: true
            },
            subTitle: {
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
            }
        }]
    },
    fifthSection: {
        mainTitle: {
            type: String,
            required: true
        },
        subTitle: {
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

export default mongoose.models.About || mongoose.model("About", aboutSchema);