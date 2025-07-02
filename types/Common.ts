export interface Home {
  metaTitle: string;
  metaDescription: string;
  bannerimage: string;
  bannerAlt: string;
  banners: { 
    title: string; 
    subtitle: string;
    btn: string;
    btnLink: string;
  }[];
}
export interface TypeFeaturedProjects {
  title: string;
  banners: { 
    image: string;   
    title: string; 
    location: string;
    client: string;
    projectvalue: string;
    superficie: string;
    sector: string;
    btn: string;
    btnLink: string;
  }[];
}
 