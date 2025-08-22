export type MenuItem = {
  title: string;
  url: string;
  children?: { title: string; url: string }[]; // Make 'children' optional
};

export const menuItems: MenuItem[] = [
  {
    title: "About",
    url: "/about-us",
    // children: [
    //   {
    //     title: "",
    //     url: "",
    //   },
    // ],
  },
  {
    title: "Expertise",
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
