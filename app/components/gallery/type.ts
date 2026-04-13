export type GalleryType = {
    metaTitle: string;
    metaDescription: string;
    pageTitle: string;
    headingHidden: boolean;
    galleryHidden: boolean;
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