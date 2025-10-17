// type.ts

export interface ExpertiseData {
  firstSection: FirstSection;
  secondSection: SecondSection;
  _id: string;
  __v: number;
  banner: string;
  bannerAlt: string;
  metaDescription: string;
  metaTitle: string;
  pageTitle: string;
}

export interface FirstSection {
  title: string;
  imageAlt: string;
  description: string;
  image: string;
}

export interface SecondSection {
  title: string;
  items: SecondSectionItem[];
}

export interface SecondSectionItem {
  _id: string;
  image: string;
  imageAlt: string;
  logo: string;
  logoAlt: string;
  title: string;
  slug: string;
  projects: string[];
  firstSection?: SecondSectionFirstSection;
  secondSection?: SecondSectionSecondSection;
  thirdSection?: SecondSectionThirdSection;
}

export interface SecondSectionFirstSection {
  title: string;
  description: string;
}

export interface SecondSectionSecondSection {
  title?: string;
  items: SecondSectionSubItem[];
}

export interface SecondSectionSubItem {
  _id: string;
  image: string;
  imageAlt: string;
  title: string;
}

export interface SecondSectionThirdSection {
  title: string;
  description: string;
  buttonText: string;
  slug: string;
  image: string;
  imageAlt: string;
}

export interface SingleProject {
  _id: string;
  name: string;
  type: string;
  sector: string;
  location: string;
  status: string;
  image: string;
  mapUrl: string;
  latitude: string;
  longitude: string;
  title: string;
  slug: string;
  thumbnail: string;
  thumbnailAlt: string;
  secondSection: {
    sector: { name: string; _id: string };
    location: { name: string; _id: string };
    projectType: { name: string; _id: string };
    status: string;
  };
}

// Component Prop
export interface ExpertiseProps {
  data: ExpertiseData;
}
