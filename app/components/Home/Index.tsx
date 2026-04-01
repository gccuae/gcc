import React from "react";
import HeroSlider from "./HeroSlider";
import AboutCompany from "./AboutCompanyV";
import FeaturedProjects from "./FeaturedProjects";
import AreaOfExpertise from "./AreaOfExpertise";
import SectorSlider from "./SectorSlider";
import NewsBlock from "./NewsBlock";
import { HomeData } from "./type";
import { Project } from "@/types/Projects";
import { NewsData } from "../news-listing/type";
import { ExpertiseData } from "../expertise/type";

interface Props {
  data: HomeData;
  projects: Project;
  news: NewsData;
  expertise: ExpertiseData;
}

const Index = ({ data, projects, news, expertise }: Props) => {
  return (
    <>
      <HeroSlider
        data={data.bannerSection.items}
        counterData={data.numberSection.items}
      />
      <AboutCompany data={data.firstSection} />
      {/* <FeaturedProjects data={projects} /> */}

      <AreaOfExpertise data={expertise.secondSection} />
      <SectorSlider data={data.fourthSection} />
      <NewsBlock data={news} />
    </>
  );
};

export default Index;
