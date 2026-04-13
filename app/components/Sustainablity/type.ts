export type SustainabilityType = {
    metaTitle: string;
    metaDescription: string;
    banner: string;
    bannerAlt: string;
    pageTitle: string;
    bannerHidden: boolean;
    firstSection: {
        hidden: boolean;
        title: string;
        description: string;
        image: string;
        imageAlt: string;
    },
    secondSection: {
        hidden: boolean;
        title: string;
        description: string;
        items: [{
            image: string;
            imageAlt: string;
            title: string;
            description: string
        }]
    },
    thirdSection: {
        hidden: boolean;
        title: string;
        items: [{
            logo: string;
            logoAlt: string;
            title: string;
            description: string;
            image: string;
            imageAlt: string;
        }]
    },
    forthSection: {
        hidden: boolean;
        title: string;
        description: string;
        items: [{
            logo: string;
            logoAlt: string;
            title: string;
            description: string;
            image: string;
            imageAlt: string;
        }]
    }
}