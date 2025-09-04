import React from 'react'


import { homeDataBanner } from "@/public/data/homebanner-data"
import { homeData } from "./data"

import { homeDataFeaturedProjects } from "@/public/data/homebanner-data"

import FeaturedProjects from "./FeaturedProjects";
import AreaOfExpertise from "./AreaOfExpertise";
import SectorSlider from "./SectorSlider";
import NewsBlock from './NewsBlock';
import HeroSliderV from './HeroSliderV';
import AboutCompanyV from './AboutCompanyV';

const IndexV2 = () => {
  return (
    <>
      <HeroSliderV data={homeDataBanner} />
      <AboutCompanyV />
      <FeaturedProjects data={homeDataFeaturedProjects} />
      <AreaOfExpertise data={homeData.fourthSection} />
      <SectorSlider data={homeData.fifthSection} />
      <NewsBlock title={homeData.sixthSection.title} link={homeData.sixthSection.link} items={homeData.sixthSection.items} />
    </>
  )
}

export default IndexV2