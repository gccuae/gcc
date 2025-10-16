export type BlogData = {
    banner: string;
    bannerAlt: string;
    pageTitle: string;
    metaTitle: string;
    metaDescription: string;
    categories: {
        category: string;
        blogs: {
            title: string;
            author: string;
            slug: string;
            content: string;
            category: string;
            thumbnail: string;
            thumbnailAlt: string;
            coverPhoto: string;
            coverPhotoAlt: string;
            quote: string;
            quoteAuthor: string;
            metaTitle: string;
            metaDescription: string;
            date: string;
            createdAt: string;
        }[];
    }[];
}
