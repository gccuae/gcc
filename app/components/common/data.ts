export type MenuItem = {
  title: string;
  url: string;
  children?: { title: string; url: string }[]; // Make 'children' optional
};

export const menuItems: MenuItem[] = [
  {
    title: "About",
    url: "/about-us",
    children: [
      {
        title: "Message from leaders",
        url: "/message-from-leaders",
      },
      {
        title: "Our Team",
        url: "/our-team",
      },
      {
        title: "Group Companies",
        url: "/group-companies",
      },
    ],
  },
  {
    title: "Expertise",
    url: "/expertise",
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
