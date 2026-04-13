export type QhseType = {
    metaTitle: string;
    metaDescription: string;
    firstSection: {
        hidden: boolean;
        mainTitle: string;
        subTitle: string;
        primaryColorText: string;
        description: string;
    },
    secondSection: {
        hidden: boolean;
        title: string;
        description: string;
        image: string;
        imageAlt: string;
        items: [{
            image: string;
            imageAlt: string;
            title: string;
        }]
    },
    thirdSection: {
        hidden: boolean;
        title: string;
        description: string;
        items: [{
            image: string;
            imageAlt: string;
            title: string;
        }]
    },
    forthSection: {
        hidden: boolean;
        title: string;
        description: string;
        items: [{
            thumbnail: string;
            thumbnailAlt: string;
            title: string;
            images: [{
                image: string;
                imageAlt: string;
            }]
        }]
    },
    fifthSection: {
        hidden: boolean;
        title: string;
        description: string;
        items: [{
            image: string;
            imageAlt: string;
            title: string;
            description: string;
        }]
    }
    certificateHidden: boolean;
}