export interface SecondSectionItemData {
  firstSection?: FirstSection;
  secondSection?: SecondSection;
  thirdSection?: ThirdSection;
  forthSection?: ForthSection;
  metaTitle?: string;
  metaDescription?: string;
  banner?: string;
  bannerAlt?: string;
  title?: string;
  slug?: string;
  _id?: string;
  latitude?: string;
  longitude?: string;
  thumbnail?: string;
  thumbnailAlt?: string;
  featuredProject?: boolean;
}

export interface FirstSection {
  images: string[];
}

export interface SecondSection {
  title: string;
  progress?: string;
  client?: string;
  scopeOfWork?: string;
  completionDate?: string;
  projectValue?: string;
  status?: string;
  projectType?: { _id: string; name: string };
  sector?: { _id: string; name: string };
  location?: { _id: string; name: string };
}

export interface ThirdSection {
  items: ThirdSectionItem[];
}

export interface  ThirdSectionItem {
  _id: string;
  title: string;
  image: string;
  imageAlt: string;
  description: string;
}

export interface ForthSection {
  title: string;
  items: ForthSectionItem[];
}

export interface ForthSectionItem {
  _id: string;
  title: string;
  description: string;
}
