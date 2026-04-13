export type AiTechnologyType = {
    banner: string;
    bannerAlt: string;
    metaTitle: string;
    metaDescription: string;
    pageTitle: string;
    bannerHidden: boolean;
    firstSection: {
        hidden: boolean;
        title: string;
        description: string;
        image: string;
        imageAlt: string;
    };
    secondSection: {
        hidden: boolean;
        items: {
            image: string;
            imageAlt: string;
            mainTitle: string;
            subTitle: string;
            description: string;
        }[];
    };
    thirdSection: {
        hidden: boolean;
        primaryColourText: string;
        title: string;
        buttonText: string;
    };
};
