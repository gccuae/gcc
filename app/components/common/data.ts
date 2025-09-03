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
        title: "Message from leaders",
        // url: "/message-from-leaders",
        url: "#",
      },
      {
        title: "Our Team",
        // url: "/our-team",
        url: "#",
      },
      {
        title: "Our Legacy",
        // url: "/services",
        url: "#",
      },
      {
        title: "Group Companies",
        // url: "/group-companies",
        url: "#",
      },
      {
        title: "Certifications",
        // url: "/contact-us",
        url: "#",
      },
    ],
  },
  {
    title: "Expertise",
    // url: "/expertise",
    url: "#",
  },
  {
    title: "AI Technology",
    url: "#",
   
  },

{
    title: "Projects",
    url: "#",
  },
{
    title: "How we work",
    url: "#",
  },
{
    title: "News & Media  ",
    url: "#",
  },
{
    title: "Careers",
    url: "#",
  },


];
