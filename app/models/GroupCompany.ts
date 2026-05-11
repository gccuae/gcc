import mongoose from "mongoose";

const groupCompanySchema = new mongoose.Schema({
    metaTitle: {
        type: String,
    },
    metaDescription: {
        type: String,
    },
    script: {
        type: String,
    },
    banner: {
        type: String,
    },
    bannerAlt: {
        type: String,
    },
    pageTitle: {
        type: String,
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
        },
        description: {
            type: String,
        },
        items: [{
            logo: {
                type: String,
            },
            logoAlt: {
                type: String,
            },
            number: {
                type: String,
            },
            value: {
                type: String,
            }
        }]
    },
    categories: [{
        category: {
            type: String,
        },
    }],
    secondSection: {
        hidden: {
            type: Boolean,
            default: false
        },
        title: {
            type: String,
        },
        description: {
            type: String,
        },
        items: [{
            link: {
                type: String,
            },
            hideCompany: {
                type: Boolean,
                default: false,
            },
            image: {
                type: String,
            },
            imageAlt: {
                type: String,
            },
            logo: {
                type: String,
            },
            logoAlt: {
                type: String,
            },
            title: {
                type: String,
            },
            category: {
                type: String,
            }
        }]
    },
})

export default mongoose.models.GroupCompany || mongoose.model("GroupCompany", groupCompanySchema);