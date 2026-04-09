// export interface Project {
//   projects: {
//     _id: string;
//     name: string;
//     thumbDescription: string;
//     type: string;
//     sector: string;
//     location: string;
//     status: string;
//     image: string;
//     mapUrl: string;
//     latitude: string;
//     longitude: string;
//     title: string;
//     slug: string;
//     thumbnail: string;
//     thumbnailAlt: string;
//     secondSection: {
//       sector: {
//         name: string;
//         _id: string;
//       };
//       location: {
//         name: string;
//         _id: string;
//       };
//       projectType: {
//         name: string;
//         _id: string;
//       };
//       status: string;
//     };
//   }[];
// }


// ----------------------
// Root API Response
// ----------------------

export interface ProjectsResponse {
  data: ProjectsPageData;
  message: string;
}

// ----------------------
// Projects Page Data
// ----------------------

export interface ProjectsPageData {
  _id: string;
  firstSection: {
    title: string;
  };
  metaTitle: string;
  metaDescription: string;
  banner: string;
  bannerAlt: string;
  pageTitle: string;
  projects: Project[];
  __v: number;
}

// ----------------------
// Project Structure (Reusable)
// ----------------------

export interface Project {
  status:string;
  _id: string;
  title: string;
  slug: string;
  banner: string;
  bannerAlt: string;
  thumbnail: string;
  thumbnailAlt: string;
  thumbDescription: string;
  latitude: string;
  longitude: string;
  featuredProject: boolean;
  relatedService: string;
  metaTitle: string;
  metaDescription: string;

  firstSection: ProjectFirstSection;
  secondSection: ProjectSecondSection;
  thirdSection: ProjectThirdSection;
  forthSection: ProjectForthSection;
}

// ----------------------
// Nested Sections
// ----------------------

export interface ProjectFirstSection {
  images: string[];
}

export interface ProjectSecondSection {
  title: string;
  progress: string;
  client: string;
  scopeOfWork: string;
  completionDate: string;
  projectValue: string;
  superficie: string;
  status: string;

  projectType: {
    _id: string;
    name: string;
  };

  sector: {
    _id: string;
    name: string;
  };

  location: {
    _id: string;
    name: string;
  };
}

export interface ProjectThirdSection {
  items: ProjectThirdItem[];
}

export interface ProjectThirdItem {
  _id: string;
  title: string;
  image: string;
  imageAlt: string;
  description: string; // HTML content
}

export interface ProjectForthSection {
  title: string;
  items: ProjectHighlight[];
}

export interface ProjectHighlight {
  _id: string;
  title: string;
  description: string;
}
