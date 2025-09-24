export type MenuItem = {
  title: string;
  url: string;
  children?: { title: string; url: string }[]; // Make 'children' optional
};

export const menuItems: MenuItem[] = [
  {
    title: "About",
    // url: "/about-us",
    url: "#",
    children: [
      {
        title: "About Us",
        url: "/about-us", 
      },
      {
        title: "Message from leaders",
        url: "/message-from-leaders", 
      }, 
      {
        title: "Sustainability",
        url: "/sustainability", 
      },
      {
        title: "Our Team",
        url: "/our-team",
      }, 
      {
        title: "Group Companies",
        url: "/group-companies",
      }, 
      {
        title: "Clients",
        url: "/clients",
      }, 
      {
        title: "Certifications",
        url: "/certifications",
      },
    ],
  },
  {
    title: "Expertise",
    url: "/expertise", 
  },
  {
    title: "AI Technology",
    url: "/ai-technology",
   
  },

{
    title: "Projects",
    url: "#",
  },
{
    title: "How we work",
    url: "/qhse",
  }, 
  {
    title: "News & Media",
    // url: "/about-us",
    url: "#",
    children: [ 
      {
        title: "News",
        url: "/news",
      }, 
      {
        title: "Blog",
        url: "/blog",
      },  
      {
        title: "Gallery",
        url: "/gallery",
      },  
    ],
  },
{
    title: "Careers",
    url: "/careers",
  },


];
