// ---------- Page Banner ----------
export interface PageBnrProps {
  pageTitle: string;
  bannerImg: string;
  bannerAlt?: string;
}

// ---------- Image Description Section ----------
export interface ImgDescProps {
  image: string;
  imageAlt?: string;
  title: string;
  description: string;
  hidden: boolean;
}

// ---------- What We Do Section ----------
export interface WhatWeDoProps {
  hidden: boolean;
  mainTitle: string;
  subTitle: string;
  firstDescription: string;
  items: {
    image: string;
    imageAlt: string;
    title: string;
  }[];
  secondDescription: string;
}

// ---------- Vision / Mission / Values ----------
export interface VmvItem {
  _id: string;
  logo: string;
  logoAlt: string;
  title: string;
  description: string;
}

export interface ThirdSection {
  hidden: boolean;
  mainTitle: string;
  subTitle: string;
  items: VmvItem[];
}

export interface ViMiVaProps {
  data: ThirdSection;
}

// ---------- Legacy / History Section ----------
export interface LegacyItem {
  _id: string;
  year: string;
  subTitle: string;
  description: string;
  image: string;
  imageAlt: string;
}

export interface LegacySection {
  hidden: boolean;
  title: string;
  items: LegacyItem[];
}

// ---------- Why Choose / Eng Section ----------
export interface WhyChooseProps {
  data: {
    hidden: boolean;
    mainTitle: string;
    subTitle: string;
    items: {
      title: string;
      description: string;
      logo: string;
      logoAlt: string;
    }[];
  };
}

// ---------- Combined Home Page Data ----------
export interface HomePageData {
  pageTitle: string;
  banner: string;
  bannerAlt: string;
  bannerHidden: boolean;
  firstSection: ImgDescProps;
  secondSection: WhatWeDoProps;
  thirdSection: ViMiVaProps["data"];
  historySection: LegacySection;
  fifthSection: WhyChooseProps["data"];
}
