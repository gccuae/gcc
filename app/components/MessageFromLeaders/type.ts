export interface MessageItem {
  _id: string;
  title: string;
  image: string;
  imageAlt: string;
  name: string;
  designation: string;
  message: string;
}

export interface MessageSection {
  items: MessageItem[];
}

// The top-level "data" from API
export interface FetchedData {
  _id: string;
  metaTitle: string;
  metaDescription: string;
  messageSection: MessageSection;
  firstSection: {
    title: string;
    items: {
      image: string;
      imageAlt: string;
      name: string;
      designation: string;
    }[]
  }
}

// Props for Index component
export interface MessageProps {
  data: FetchedData;
}
