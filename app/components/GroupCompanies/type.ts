// types.ts

// ---------- First Section Item ----------
export interface FirstSectionItem {
  _id: string;
  logo: string;
  logoAlt: string;
  number: string;
  value: string;
}

// ---------- First Section ----------
export interface FirstSection {
  title: string;
  description: string;
  items: FirstSectionItem[];
}

// ---------- Second Section Item ----------
export interface SecondSectionItem {
  _id: string;
  image: string;
  imageAlt: string;
  logo: string;
  logoAlt: string;
  title: string;
  category: string;
  hideCompany: boolean;
  link: string;
}

// ---------- Second Section ----------
export interface SecondSection {
  title: string;
  description: string;
  items: SecondSectionItem[];
}

// ---------- Category ----------
export interface Category {
  _id: string;
  category: string;
}

// ---------- Full Group Companies Page Data ----------
export interface GroupCompaniesPageData {
  _id: string;
  pageTitle: string;
  banner: string;
  bannerAlt: string;
  firstSection: FirstSection;
  secondSection: SecondSection;
  categories: Category[];
  metaTitle: string;
  metaDescription: string;
  __v: number;
}

// ---------- Props for GroupCompanies Component ----------
export interface GroupCompaniesProps {
  data: GroupCompaniesPageData;
}
