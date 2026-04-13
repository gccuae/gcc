export type BlogData = {
    banner: string;
    bannerAlt: string;
    pageTitle: string;
    metaTitle: string;
    metaDescription: string;
    bannerHidden: boolean;
    blogsHidden: boolean;
    categories: {
        category: string;
        blogs: {
            status: string;
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
