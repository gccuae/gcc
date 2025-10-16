import React from "react";

import HeroSlider from "./HeroSlider";
import { homeData } from "./data";

import AboutCompany from "./AboutCompanyV";
import FeaturedProjects from "./FeaturedProjects";
import AreaOfExpertise from "./AreaOfExpertise";
import SectorSlider from "./SectorSlider";
import NewsBlock from "./NewsBlock";
import { HomeData } from "./type";
import { Project } from "@/types/Projects";
import { NewsData } from "../news-listing/type";

interface Props {
  data: HomeData;
  projects: Project;
  news: NewsData;
}

const Index = ({ data, projects }: Props) => {
  console.log(data, "data");
  return (
    <>
      <HeroSlider
        data={data.bannerSection.items}
        counterData={data.numberSection.items}
      />
      <AboutCompany data={data.firstSection} />
      <FeaturedProjects data={projects} />

      <AreaOfExpertise data={data.thirdSection} />
      <SectorSlider data={data.fourthSection} />

      <NewsBlock
        title={homeData.sixthSection.title}
        link={homeData.sixthSection.link}
        items={homeData.sixthSection.items}
      />
    </>
  );
};

export default Index;
