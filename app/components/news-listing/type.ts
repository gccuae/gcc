export type NewsData = {
    banner: string;
    bannerAlt: string;
    pageTitle: string;
    metaTitle: string;
    metaDescription: string;
    categories: {
        category: string;
        news: {
            status:string;
            title: string;
            subTitle: string;
            images: string[];
            slug: string;
            content: string;
            category: string;
            thumbnail: string;
            thumbnailAlt: string;
            coverPhoto: string;
            coverPhotoAlt: string;
            metaTitle: string;
            metaDescription: string;
            date: string;
            createdAt: string;
            description: string;
        }[];
    }[];
}
