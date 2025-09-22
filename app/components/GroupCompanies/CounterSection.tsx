"use client"

import Counter from "../common/Counter";
import { groupCompaniesData } from "./data";
import Image from "next/image";

const CounterSection = () => {
  return (
    <section className="pt-57px bg-light-white dark:bg-[#0d0d0d]">
      <div className="container">
        <div className="mb-6 xl:mb-[47px]">
          <h2 className="text-6xl leading-lh-title font-normal mb-4 xl:mb-[27px] text-black dark:text-white">
            {groupCompaniesData.section1.title}
          </h2>
          <p className="text-lg leading-lh-text19 text-black dark:text-white font-light">
            {groupCompaniesData.section1.desc}
          </p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 border-t border-l border-r border-smgray dark:border-[#3f3f3f]">
          {groupCompaniesData.section1.items.map((item, index) => (
            <div
              key={index}
              className="border-r dark:border-[#3f3f3f] border-smgray last:border-r-0 [&:nth-child(2)]:border-r-0 [&:nth-child(4)]:border-r-0 lg:[&:nth-child(2)]:border-r-1
            px-5 md:px-10 xl:px-18 pt-4 xl:pt-[22px] pb-4 xl:pb-[21px]
               hover:bg-primary hover:text-white transition-all duration-300 group"
            >
              <div className="">
                <div className="mb-47px h-10 xl:h-15">
                  <Image
                    src={item.icon}
                    alt={item.desc}
                    width={100}
                    height={100}
                    className="w-10 h-auto xl:w-15 group-hover:brightness-0 group-hover:invert-100 transition-all duration-300"
                  />
                </div>
                <h3 className="text-5xl leading-lh-text68 font-normal mb-4 xl:mb-[27px] text-black dark:text-white group-hover:text-white transition-all duration-300">
                  <Counter from={0} to={item.count} duration={2} />+
                </h3>
                <p className="text-lg leading-lh-text19 dark:text-white">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CounterSection;
