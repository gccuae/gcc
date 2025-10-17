export interface ClientsData {
  _id: string;
  __v: number;
  banner: string;
  bannerAlt: string;
  metaDescription: string;
  metaTitle: string;
  pageTitle: string;
  firstSection: ClientsFirstSection;
}

export interface ClientsFirstSection {
  description: string;
  items: ClientItem[];
}

export interface ClientItem {
  _id: string;
  logo: string;
  logoAlt: string;
}
