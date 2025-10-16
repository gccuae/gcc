export interface Project {
  projects: {
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
      sector: {
        name: string;
        _id: string;
      };
      location: {
        name: string;
        _id: string;
      };
      projectType: {
        name: string;
        _id: string;
      };
      status: string;
    };
  }[];
}
