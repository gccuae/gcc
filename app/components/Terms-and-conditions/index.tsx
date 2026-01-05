import PageBnr from "../common/PageBnr";
import React from "react";
import ContentSection from "./ContentSection";
import { TermsConditionsType } from "./type";

const Index = ({ data }: { data: TermsConditionsType }) => {
  return (
    <>
      <PageBnr
        pageTitle='Terms and Conditions '
        bannerImg='/assets/img/sustainablity/sus-banner.jpg'
        bannerAlt='Terms & Conditions Banner'
      />
      <ContentSection  />
    </>
  );
};

export default Index;