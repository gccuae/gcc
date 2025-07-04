import React from 'react'

import HeroSlider from "./HeroSlider";
import { homeDataBanner } from "@/public/data/homebanner-data"
 import { homeData } from "./data"

import {homeDataFeaturedProjects } from "@/public/data/homebanner-data"
import AboutCompany from "./AboutCompany";
import FeaturedProjects from "./FeaturedProjects";
import AreaOfExpertise from "./AreaOfExpertise";
import SectorSlider from "./SectorSlider";
import NewsBlock from './NewsBlock'; 

const Index = () => {
  return (
    <>

    <HeroSlider data={homeDataBanner}/>
    
       <AboutCompany />
       <FeaturedProjects data={homeDataFeaturedProjects} />
      
      <AreaOfExpertise data={homeData.fourthSection}/>
      <SectorSlider data={homeData.fifthSection} />
      <NewsBlock title={homeData.sixthSection.title} link={homeData.sixthSection.link} items={homeData.sixthSection.items} /> 
    </>
  )
}

export default Index