export interface Home {
  metaTitle: string;
  metaDescription: string;
  bannerAlt: string;
  banners: {
    title: string;
    subtitle: string;
    btn: string;
    btnLink: string;
    bannerimage: string;
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

export interface Navbar {
  navSection: {
    items: {
      title: string;
      url: string;
      hidden:boolean;
      subItems: {
        title: string;
        url: string;
        hidden:boolean;
      }[]
    }[]
  }
}
