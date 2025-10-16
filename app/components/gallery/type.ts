export type GalleryType = {
    metaTitle: string;
    metaDescription: string;
    pageTitle: string;
    items: {
        item: string;
        thumbnail: string;
        thumbnailAlt: string;
        images: {
            image: string;
            imageAlt: string;
        }[];
    }[];
}