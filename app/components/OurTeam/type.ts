// types.ts

// ---------- Team Member ----------
export interface TeamMember {
  _id: string;
  image: string;
  imageAlt: string;
  name: string;
  designation: string;
  category?: string; // optional, since firstSection may not have category
}

// ---------- First Section ----------
export interface FirstSection {
  title: string;
  items: TeamMember[];
}

// ---------- Second Section ----------
export interface SecondSection {
  title: string;
  items: TeamMember[];
}

// ---------- Category ----------
export interface Category {
  _id: string;
  category: string;
  members: TeamMember[];
}

// ---------- Full Our Team Page Data ----------
export interface OurTeamPageData {
  _id: string;
  metaTitle: string;
  metaDescription: string;
  firstSection: FirstSection;
  secondSection: SecondSection;
  categories: Category[];
  __v: number;
}

// ---------- Props for StaffList / Index Component ----------
export interface OurTeamProps {
  data: OurTeamPageData;
}
