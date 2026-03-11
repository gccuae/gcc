"use client";

import { serviceDetailsData } from "./data";
import ExpertiseCard from "../expertise/ExpertiseCard";
import BtnPrimary from "../common/BtnPrimary";
import { SecondSectionItem } from "../expertise/type";

interface MoreExpertiseProps {
  allServices: SecondSectionItem[];
  exclude: string;
}

const MoreExpertise = ({ allServices, exclude }: MoreExpertiseProps) => {
  const filteredServices = allServices.filter(
    (service) => service._id !== exclude
  );
  return (
    <section className="py-57px bg-light-white dark:bg-black">
      <div className="container">
        <div className="flex  gap-y-3 justify-between items-center pb-8 xl:pb-47px mb-8 xl:mb-47px border-b dark:border-white/20">
          <h2 className=" text-4xl xl:text-5xl leading-[1.147058823529412] text-black dark:text-white">
            {serviceDetailsData.moreExperiences.title}
          </h2>
          <div className="flex items-center gap-6">
            <BtnPrimary link={"/expertise"} text="View All" bgtrans={true} />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 xl:gap-[30px]">
          {filteredServices.slice(0, 3).map((item, index) => (
            <div key={index} className="col-span-1">
              <ExpertiseCard key={index} item={item} index={index} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MoreExpertise;
