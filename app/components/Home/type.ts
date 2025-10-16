// Single banner item
export interface BannerItem {
  _id: string;
  image: string;
  imageAlt: string;
  title: string;
  description: string;
}

// Banner section
export interface BannerSection {
  items: BannerItem[];
}

// Other sections...
export interface NumberItem {
  _id: string;
  number: string;
  value: string;
}

export interface NumberSection {
  items: NumberItem[];
}

export interface FirstSection {
  buttonText: string;
  description: string;
  video: string;
  poster: string;
}

export interface ExpertiseItem {
  _id: string;
  logo: string;
  logoAlt: string;
  image: string;
  imageAlt: string;
  title: string;
  description: string;
}

export interface ThirdSection {
  title: string;
  items: ExpertiseItem[];
}

export interface SectorItem {
  _id: string;
  logo: string;
  logoAlt: string;
  image: string;
  imageAlt: string;
  title: string;
  description: string;
}

export interface FourthSection {
  title: string;
  items: SectorItem[];
}

export interface HomeData {
  _id: string;
  __v: number;
  metaTitle: string;
  metaDescription: string;
  bannerSection: BannerSection;
  numberSection: NumberSection;
  firstSection: FirstSection;
  thirdSection: ThirdSection;
  fourthSection: FourthSection;
}

export interface HomeResponse {
  data: HomeData;
  message: string;
}


export interface NewsData {
  title: string;
  subTitle: string;
  description: string;
  slug: string;
  content: string;
  category: string;
  thumbnail: string;
  thumbnailAlt: string;
  metaTitle: string;
  metaDescription: string;
  images: string[];
  date: string;       // ISO string format
  _id: string;
  createdAt: string;  // ISO string format
}