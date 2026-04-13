import mongoose from "mongoose";

const expertiseSchema = new mongoose.Schema({
    banner: {
        type: String,
        required: true
    },
    bannerAlt: {
        type: String,
    },
    metaTitle: {
        type: String,
    },
    metaDescription: {
        type: String,
    },
    pageTitle: {
        type: String,
        required: true
    },
    bannerHidden: {
        type: Boolean,
        default: false
    },
    firstSection: {
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
        items: [{
            status: {
                type: String,
                enum: ["draft", "published"],
                default: "draft",
            },
            projects: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: "Project"
            }],
            image: {
                type: String,
                required: true
            },
            imageAlt: {
                type: String,
            },
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
            slug: {
                type: String,
                required: true
            },
            description: {
                type: String,
                required: true
            },
            homeThumbnail: {
                type: String,
                required: true
            },
            homeThumbnailAlt: {
                type: String,
            },
            metaTitle: {
                type: String,
            },
            metaDescription: {
                type: String,
            },
            firstSection: {
                title: {
                    type: String,
                },
                description: {
                    type: String,
                }
            },
            secondSection: {
                title: {
                    type: String,
                },
                items: [{
                    image: {
                        type: String
                    },
                    imageAlt: {
                        type: String
                    },
                    title: {
                        type: String,
                    }
                }]
            },
            thirdSection: {
                title: {
                    type: String,
                },
                description: {
                    type: String,
                },
                buttonText: {
                    type: String,
                },
                slug: {
                    type: String,
                },
                image: {
                    type: String,
                },
                imageAlt: {
                    type: String,
                }
            }
        }]
    }
})

export default mongoose.models.Expertise || mongoose.model("Expertise", expertiseSchema);