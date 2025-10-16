export type AiTechnologyType = {
    banner: string;
    bannerAlt: string;
    metaTitle: string;
    metaDescription: string;
    pageTitle: string;
    firstSection: {
        title: string;
        description: string;
        image: string;
        imageAlt: string;
    };
    secondSection: {
        items: {
            image: string;
            imageAlt: string;
            mainTitle: string;
            subTitle: string;
            description: string;
        }[];
    };
    thirdSection: {
        primaryColourText: string;
        title: string;
        buttonText: string;
    };
};
