import mongoose from "mongoose";

const openingsSchema = new mongoose.Schema({
    metaTitle: {
        type: String,
    },
    metaDescription: {
        type: String,
    },
    firstSection: {
        hidden: { type: Boolean, default: false },
        pageTitle: {
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
        hidden: { type: Boolean, default: false },
        mainTitle: {
            type: String,
            required: true
        },
        subTitle: {
            type: String,
            required: true
        }
    },
    thirdSection: {
        hidden: { type: Boolean, default: false },
        title: {
            type: String,
            required: true
        }
    },
    departments: [{
        name: {
            type: String,
            required: true
        }
    }],
    locations: [{
        name: {
            type: String,
            required: true
        }
    }],
    openings: [
        {
            status: {
                type: String
            },
            metaTitle: {
                type: String,
            },
            metaDescription: {
                type: String,
            },
            firstSection: {
                hidden: { type: Boolean, default: false },
                title: {
                    type: String,
                },
                jobTitle: {
                    type: String,
                },
                department: {
                    type: String,
                },
                location: {
                    type: String,
                },
                employmentType: {
                    type: String,
                },
                slug: {
                    type: String,
                }
            },
            secondSection: {
                hidden: { type: Boolean, default: false },
                title: {
                    type: String,
                },
                description: {
                    type: String,
                }
            },
            thirdSection: {
                hidden: { type: Boolean, default: false },
                title: {
                    type: String,
                },
                description: {
                    type: String,
                }
            },
            forthSection: {
                hidden: { type: Boolean, default: false },
                title: {
                    type: String,
                },
                description: {
                    type: String,
                }
            }
        }
    ]
})

export default mongoose.models.Openings || mongoose.model("Openings", openingsSchema);