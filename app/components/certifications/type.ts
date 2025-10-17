// type.ts

// Single file/document (award or certification)
export interface CertificationItem {
  _id: string;
  mainTitle: string; // title of the file
  subTitle: string; // subtitle or info
  file: string; // URL to the PDF or document
  thumbnail?: string; // optional image for preview
  documentTitle?: string; // used in DetailsBlock
  documentInfo?: string; // used in DetailsBlock
  category?: string; // optional, if needed
}

// Category of awards/certifications
export interface CertificationCategory {
  _id: string;
  category: string; // e.g., "Awards & Recognitions"
  files: CertificationItem[]; // array of items
}

// Page data
export interface AwardsPageData {
  _id: string;
  categories: CertificationCategory[];
  metaTitle: string;
  metaDescription: string;
  pageTitle: string;
  __v?: number;
}

// Props for Main component
export interface AwardsProps {
  data: AwardsPageData;
}
